"use client";

// app/math/MathCategoryClient.tsx
//
// Client half of the math category page. It was previously app/math/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/math/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function MathCategoryClient() {
    const calculators = getCalculatorsByCategory('math');

    // SEO Data - Mathematics & Academic Focus
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
                        Mathematics & Problem Solving
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>

                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Mathematics Calculators
                    </h1>

                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">percentages, fractions, quadratic equations, geometry areas, algebra equations, and statistics</strong> instantly.
                        <span className="block mt-2 text-blue-600 text-sm">Perfect for students and professionals — 100% free, no sign-up required</span>
                    </p>

                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Step-by-step solutions</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>

                {/* Calculators Count */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    {calculators.length > 0 ? (
                        <>📐 <span className="font-semibold text-blue-600">{calculators.length}+ mathematics calculators</span> available — all free to use</>
                    ) : (
                        <>📐 <span className="font-semibold text-blue-600">New mathematics calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">📐</div>
                        <p className="text-ink-faint mb-2">More mathematics calculators coming soon!</p>
                        <p className="text-ink-faint text-sm">Check back next week for algebra and geometry tools.</p>
                    </div>
                )}

                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Mathematics Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">mathematics calculators</strong> are designed for students,
                                teachers, engineers, scientists, and professionals who need quick, accurate mathematical solutions.
                                Each tool uses standard mathematical formulas and algorithms taught in schools and universities worldwide.
                            </p>
                            <p>
                                The <strong className="text-ink">Percentage Calculator</strong> handles percentage increase, decrease,
                                difference, and percentage of a number. Perfect for discounts, tax calculations, tips, and data analysis.
                                No more mental math errors — get accurate results instantly.
                            </p>
                            <p>
                                Our <strong className="text-ink">Fraction Calculator</strong> simplifies, adds, subtracts, multiplies,
                                and divides fractions. Converts between proper fractions, improper fractions, and mixed numbers.
                                Essential for students learning fraction operations.
                            </p>
                            <p>
                                The <strong className="text-ink">Quadratic Equation Solver</strong> solves ax² + bx + c = 0 equations
                                using the quadratic formula. Shows both real and complex roots. Perfect for algebra students and anyone
                                needing to find x-intercepts of parabolas.
                            </p>
                            <p>
                                Our <strong className="text-ink">Geometry Calculators</strong> compute areas, volumes, perimeters, and
                                side lengths for triangles, circles, rectangles, cubes, spheres, and cylinders. The
                                <strong className="text-ink">Statistics Calculators</strong> find mean, median, mode, range, and
                                standard deviation for any dataset.
                            </p>
                            <p>
                                <strong className="text-ink">100% free, no registration, no data collection.</strong> All calculations
                                happen in your browser — your work stays private.
                            </p>
                        </div>

                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Mathematical Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">Percentage Calculator:</strong> Increase, decrease, difference, and percentage of a number</li>
                                <li><strong className="text-ink">Fraction Calculator:</strong> Simplify, add, subtract, multiply, divide fractions</li>
                                <li><strong className="text-ink">Quadratic Equation:</strong> Solve ax² + bx + c = 0 with real/complex roots</li>
                                <li><strong className="text-ink">Area Calculator:</strong> Triangle, circle, rectangle, square, trapezoid</li>
                                <li><strong className="text-ink">Volume Calculator:</strong> Cube, sphere, cylinder, cone, rectangular prism</li>
                                <li><strong className="text-ink">Slope Calculator:</strong> Find line slope between two points (x₁,y₁) to (x₂,y₂)</li>
                                <li><strong className="text-ink">Distance Calculator:</strong> Distance between two points in 2D or 3D space</li>
                                <li><strong className="text-ink">Mean/Median/Mode:</strong> Central tendency statistics for any dataset</li>
                                <li><strong className="text-ink">Ratio Calculator:</strong> Simplify and compare ratios</li>
                                <li><strong className="text-ink">Decimal to Fraction:</strong> Convert terminating or repeating decimals</li>
                            </ul>

                            {/* Mathematical Concepts Covered */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-ink mb-2">Mathematical Concepts Covered</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Arithmetic</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Algebra</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Geometry</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Trigonometry</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Statistics</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Calculus</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Linear Algebra</span>
                                </div>
                            </div>

                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600/80">
                                    💡 <strong className="text-blue-600">Pro Tip:</strong> Use our Percentage Calculator for quick discount calculations —
                                    if an item is 30% off, just enter the original price and 30% decrease. For quadratic equations,
                                    always verify the discriminant (b² - 4ac) to know if roots are real or complex before solving.
                                </p>
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-cream rounded text-[11px] text-ink-faint italic">
                                Note: These calculators follow standard mathematical formulas and algorithms. Results are verified against
                                mathematical principles. Double-check critical calculations for exams or professional work.
                            </div>
                        </div>
                    </div>

                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-hairline text-xs text-ink-faint text-center">
                        <p>Related:
                            <a href="/calculators" className="text-blue-600 hover:underline mx-1">All Calculators</a> •
                            <a href="/education" className="text-blue-600 hover:underline mx-1">Education Calculators</a> •
                            <a href="/conversion/unit-converter" className="text-blue-600 hover:underline mx-1">Unit Converter</a>
                        </p>
                        <p className="mt-2 text-ink-faint text-[11px]">
                            <span className="text-ink-faint">📐 Standard mathematical formulas & algorithms | </span>
                            <span className="text-ink-faint">Perfect for homework, exams, and professional work</span>
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}