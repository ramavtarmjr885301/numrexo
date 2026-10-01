"use client";

// app/construction/ConstructionCategoryClient.tsx
//
// Client half of the construction category page. It was previously app/construction/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/construction/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function ConstructionCategoryClient() {
    const calculators = getCalculatorsByCategory('construction');
    
    // SEO Data - Construction Niche
    const pageUrl = "https://numrexo.com/construction";
    const siteName = "Numrexo";
    
    // Structured Data for Construction Tools
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Construction Calculators",
        "description": "Professional construction material calculators for concrete, paint, flooring, and area estimation.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length
    };
    
    return (
        <>
{/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="px-4 sm:px-6 py-8 md:py-12 max-w-6xl mx-auto">
                
                {/* Header Section - GREEN COLOR (consistent with health page) */}
                <div className="text-center mb-10 md:mb-12">
                    {/* Category Badge - Green (like health page) */}
                    <span className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Construction & Engineering
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Construction Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">concrete volume, paint quantity, flooring materials, carpet area, built-up area, and land estimation</strong> instantly. 
                        Plan your construction projects with <strong className="text-green-600">professional-grade accuracy</strong> — <strong className="text-ink">100% free, no sign-up required.</strong>
                    </p>
                    
                    {/* Trust Badges - Green accent */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Standard published formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                        <span className="flex items-center gap-1">✓ Instant results</span>
                    </div>
                </div>
                
                {/* Calculators Count - Green accent */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    🏗️ <span className="font-semibold text-green-600">{calculators.length}+ construction calculators</span> available — save time, reduce waste, estimate accurately
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
                        <p className="text-ink-faint">🏗️ More construction calculators coming soon!</p>
                        <p className="text-sm text-ink-faint mt-2">Check back next week for concrete footing, brickwork, and steel calculation tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - NO FOOTER, only educational content */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Educational Content */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Construction Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">construction calculators</strong> are designed for contractors, civil engineers, architects, 
                                and DIY homeowners. Each tool uses industry-standard formulas to ensure accurate material estimation.
                            </p>
                            <p>
                                The <strong className="text-ink">Concrete Calculator</strong> helps you determine exact cubic yards/meters needed for slabs and footings. 
                                The <strong className="text-ink">Paint Calculator</strong> estimates gallons/liters based on wall area. 
                                The <strong className="text-ink">Flooring Calculator</strong> calculates tiles or laminate needed including waste factor.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Calculations List */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Construction Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">Concrete Volume:</strong> Slabs, foundations, walls, columns</li>
                                <li><strong className="text-ink">Paint Quantity:</strong> Interior/exterior walls, multiple coats</li>
                                <li><strong className="text-ink">Flooring Materials:</strong> Tiles, hardwood, laminate with waste factor</li>
                                <li><strong className="text-ink">Carpet Area:</strong> Usable floor area inside walls</li>
                                <li><strong className="text-ink">Built-up Area:</strong> Total covered area including walls</li>
                                <li><strong className="text-ink">Land Area:</strong> Sq ft, sq m, acres, hectares, gunta, bigha</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Pro Tip Box - Green accent */}
                    <div className="mt-8 p-5 bg-surface rounded-xl border border-hairline">
                        <h3 className="text-md font-semibold text-ink mb-2 flex items-center gap-2">
                            <span>📐</span> Pro Tip for Accurate Material Estimation
                        </h3>
                        <p className="text-sm text-ink-faint">
                            Always add <strong className="text-green-600">5-10% waste factor</strong> for concrete, tiles, and paint to account for breakage, spills, and cutting errors. 
                            For flooring, add <strong className="text-green-600">10-15% waste factor</strong> — especially for patterned tiles or diagonal installation.
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}