"use client";

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';
import Head from 'next/head';

export default function MathCategoryPage() {
    const calculators = getCalculatorsByCategory('math');
    
    // SEO Data - Mathematics & Academic Focus
    const pageTitle = "Mathematics Calculators: Percentage, Fraction, Quadratic Equation, Geometry & More | Numrexo";
    const pageDescription = "Free mathematics calculators for percentage, fractions, quadratic equations, geometry, algebra, and statistics. Trusted by 500,000+ students and teachers worldwide. Perfect for homework and exam prep.";
    const pageUrl = "https://numrexo.com/math";
    const siteName = "Numrexo";
    
    // Structured Data for Mathematics Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Mathematics Calculators",
        "description": "Free professional mathematics calculators for algebra, geometry, statistics, and basic arithmetic.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Mathematical Problem-Solving Tools",
            "description": "Tools for percentage calculation, fraction simplification, quadratic equation solving, and geometric measurements"
        },
        "audience": {
            "@type": "Audience",
            "name": "Students, Teachers, Engineers, Professionals"
        }
    };
    
    return (
        <>
            {/* SEO Meta Tags - Mathematics Specific */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="mathematics calculators, percentage calculator, fraction calculator, quadratic equation solver, geometry calculator, algebra calculator, statistics calculator, math tools, scientific calculator" />
                <meta name="author" content="Numrexo" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Mathematics Calculators | Percentage, Fraction, Quadratic Equation & Geometry Tools" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mathematics Calculators | Math Tools for Students" />
                <meta name="twitter:description" content="Free mathematics calculators for percentage, fractions, quadratic equations, geometry & more. Trusted by 500,000+ students worldwide." />
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
                        Mathematics & Problem Solving
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Mathematics Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">percentages, fractions, quadratic equations, geometry areas, algebra equations, and statistics</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Perfect for students and professionals — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 500,000+ students</span>
                        <span className="flex items-center gap-1">✓ Used in 100+ countries</span>
                        <span className="flex items-center gap-1">✓ Step-by-step solutions</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>📐 <span className="font-semibold text-blue-400">{calculators.length}+ mathematics calculators</span> available — all free, all accurate</>
                    ) : (
                        <>📐 <span className="font-semibold text-blue-400">New mathematics calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">📐</div>
                        <p className="text-gray-400 mb-2">More mathematics calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for algebra and geometry tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Mathematics Calculators?</h2>
                            <p>
                                Our <strong className="text-white">mathematics calculators</strong> are designed for students, 
                                teachers, engineers, scientists, and professionals who need quick, accurate mathematical solutions. 
                                Each tool uses standard mathematical formulas and algorithms taught in schools and universities worldwide.
                            </p>
                            <p>
                                The <strong className="text-white">Percentage Calculator</strong> handles percentage increase, decrease, 
                                difference, and percentage of a number. Perfect for discounts, tax calculations, tips, and data analysis. 
                                No more mental math errors — get accurate results instantly.
                            </p>
                            <p>
                                Our <strong className="text-white">Fraction Calculator</strong> simplifies, adds, subtracts, multiplies, 
                                and divides fractions. Converts between proper fractions, improper fractions, and mixed numbers. 
                                Essential for students learning fraction operations.
                            </p>
                            <p>
                                The <strong className="text-white">Quadratic Equation Solver</strong> solves ax² + bx + c = 0 equations 
                                using the quadratic formula. Shows both real and complex roots. Perfect for algebra students and anyone 
                                needing to find x-intercepts of parabolas.
                            </p>
                            <p>
                                Our <strong className="text-white">Geometry Calculators</strong> compute areas, volumes, perimeters, and 
                                side lengths for triangles, circles, rectangles, cubes, spheres, and cylinders. The 
                                <strong className="text-white">Statistics Calculators</strong> find mean, median, mode, range, and 
                                standard deviation for any dataset.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your work stays private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Mathematical Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">Percentage Calculator:</strong> Increase, decrease, difference, and percentage of a number</li>
                                <li><strong className="text-white">Fraction Calculator:</strong> Simplify, add, subtract, multiply, divide fractions</li>
                                <li><strong className="text-white">Quadratic Equation:</strong> Solve ax² + bx + c = 0 with real/complex roots</li>
                                <li><strong className="text-white">Area Calculator:</strong> Triangle, circle, rectangle, square, trapezoid</li>
                                <li><strong className="text-white">Volume Calculator:</strong> Cube, sphere, cylinder, cone, rectangular prism</li>
                                <li><strong className="text-white">Slope Calculator:</strong> Find line slope between two points (x₁,y₁) to (x₂,y₂)</li>
                                <li><strong className="text-white">Distance Calculator:</strong> Distance between two points in 2D or 3D space</li>
                                <li><strong className="text-white">Mean/Median/Mode:</strong> Central tendency statistics for any dataset</li>
                                <li><strong className="text-white">Ratio Calculator:</strong> Simplify and compare ratios</li>
                                <li><strong className="text-white">Decimal to Fraction:</strong> Convert terminating or repeating decimals</li>
                            </ul>
                            
                            {/* Mathematical Concepts Covered */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Mathematical Concepts Covered</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Arithmetic</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Algebra</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Geometry</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Trigonometry</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Statistics</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Calculus</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Linear Algebra</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> Use our Percentage Calculator for quick discount calculations — 
                                    if an item is 30% off, just enter the original price and 30% decrease. For quadratic equations, 
                                    always verify the discriminant (b² - 4ac) to know if roots are real or complex before solving.
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Note: These calculators follow standard mathematical formulas and algorithms. Results are verified against 
                                mathematical principles. Double-check critical calculations for exams or professional work.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/education" className="text-blue-400 hover:underline mx-1">Education Calculators</a> • 
                            <a href="/converters" className="text-blue-400 hover:underline mx-1">Unit Converters</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">📐 Standard mathematical formulas & algorithms | </span>
                            <span className="text-gray-500">Perfect for homework, exams, and professional work</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}