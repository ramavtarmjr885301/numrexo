"use client";

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';
import Head from 'next/head';

export default function ScienceCategoryPage() {
    const calculators = getCalculatorsByCategory('science');
    
    // SEO Data - Science & Physics Focus
    const pageTitle = "Science Calculators: Distance, Speed, Time, Acceleration, Force, Energy & More | Numrexo";
    const pageDescription = "Free science calculators for distance, speed, time, acceleration, force, energy, pressure, and physics formulas. Trusted by 250,000+ students, teachers, and science enthusiasts worldwide.";
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
            {/* SEO Meta Tags - Science Specific */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="science calculators, distance speed time calculator, acceleration calculator, force calculator, energy calculator, pressure calculator, physics calculators, scientific calculators, mechanics tools" />
                <meta name="author" content="Numrexo" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Science Calculators | Distance, Speed, Time, Acceleration & Physics Tools" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Science Calculators | Physics Tools for Students" />
                <meta name="twitter:description" content="Free science calculators for distance, speed, time, acceleration, force, energy & more. Trusted by 250,000+ students worldwide." />
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
                        Physics & Science
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Science Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">distance, speed, time, acceleration, force, energy, pressure, and scientific formulas</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Perfect for students, teachers, and science enthusiasts — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 250,000+ students</span>
                        <span className="flex items-center gap-1">✓ Used in 90+ countries</span>
                        <span className="flex items-center gap-1">✓ Newtonian physics formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>🔬 <span className="font-semibold text-blue-400">{calculators.length}+ science calculators</span> available — all free, all accurate</>
                    ) : (
                        <>🔬 <span className="font-semibold text-blue-400">New science calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">🔬</div>
                        <p className="text-gray-400 mb-2">More science calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for physics and mechanics tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Science Calculators?</h2>
                            <p>
                                Our <strong className="text-white">science calculators</strong> are designed for high school and 
                                college students, physics teachers, engineers, and science enthusiasts. Each tool uses standard 
                                scientific formulas based on Newtonian physics, classical mechanics, and fundamental scientific principles.
                            </p>
                            <p>
                                The <strong className="text-white">Distance, Speed & Time Calculator</strong> solves the classic 
                                d = s × t equation. Enter any two values — get the third instantly. Perfect for motion problems, 
                                travel planning, and physics homework.
                            </p>
                            <p>
                                Our <strong className="text-white">Acceleration Calculator</strong> computes acceleration using 
                                a = (v - u) / t formula. Find initial velocity, final velocity, time, or acceleration. Essential 
                                for understanding motion dynamics and force relationships.
                            </p>
                            <p>
                                The <strong className="text-white">Force Calculator</strong> applies Newton's Second Law (F = m × a). 
                                Calculate force, mass, or acceleration. Fundamental for mechanics problems and understanding how 
                                forces affect motion.
                            </p>
                            <p>
                                Our <strong className="text-white">Energy Calculators</strong> compute kinetic energy (½mv²) and 
                                potential energy (mgh). The <strong className="text-white">Pressure Calculator</strong> uses P = F/A 
                                formula. These tools are essential for work-energy theorem problems and fluid mechanics.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your scientific work stays private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Scientific Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">Distance-Speed-Time:</strong> d = s × t — motion and travel problems</li>
                                <li><strong className="text-white">Acceleration:</strong> a = (v - u) / t — change in velocity over time</li>
                                <li><strong className="text-white">Force (Newton's Second Law):</strong> F = m × a — mass and acceleration</li>
                                <li><strong className="text-white">Kinetic Energy:</strong> KE = ½mv² — energy of moving objects</li>
                                <li><strong className="text-white">Potential Energy:</strong> PE = mgh — gravitational potential energy</li>
                                <li><strong className="text-white">Pressure:</strong> P = F/A — force distributed over area</li>
                                <li><strong className="text-white">Work Calculator:</strong> W = F × d × cosθ — force over distance</li>
                                <li><strong className="text-white">Power Calculator:</strong> P = W/t or P = F × v — rate of doing work</li>
                                <li><strong className="text-white">Density Calculator:</strong> ρ = m/V — mass per unit volume</li>
                                <li><strong className="text-white">Momentum Calculator:</strong> p = m × v — mass in motion</li>
                            </ul>
                            
                            {/* Scientific Formulas Covered */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Scientific Laws & Formulas Used</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Newton's Laws of Motion</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Work-Energy Theorem</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Kinematic Equations</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Law of Conservation of Energy</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Pascal's Principle</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> For motion problems, always identify your known and unknown 
                                    variables first. Use our Distance-Speed-Time calculator for constant velocity problems, and Acceleration 
                                    calculator for uniformly accelerated motion. Remember: Force = mass × acceleration — the same formula 
                                    explains everything from pushing a cart to rocket propulsion!
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Note: These calculators use standard physics formulas and SI units (meters, kilograms, seconds, Newtons, Joules). 
                                Results are ideal (no friction, air resistance, or other real-world factors). For precise engineering work, 
                                consult domain-specific references.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/math" className="text-blue-400 hover:underline mx-1">Mathematics Calculators</a> • 
                            <a href="/converters" className="text-blue-400 hover:underline mx-1">Unit Converters</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">⚛️ Newtonian physics & SI units | </span>
                            <span className="text-gray-500">Ideal for homework, lab work, and conceptual understanding</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}