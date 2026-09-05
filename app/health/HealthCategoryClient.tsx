"use client";

// app/health/HealthCategoryClient.tsx
//
// Client half of the health category page. It was previously app/health/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/health/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function HealthCategoryClient() {
    const calculators = getCalculatorsByCategory('health');
    
    // SEO Data - Health & Wellness Focus (Global Traffic)
    const pageUrl = "https://numrexo.com/health";
    const siteName = "Numrexo";
    
    // Structured Data for Health Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Health Calculators",
        "description": "Free professional health calculators for wellness tracking, pregnancy planning, and fitness monitoring.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Health & Wellness Tools",
            "description": "Tools for BMI calculation, pregnancy due date, ovulation tracking, water intake, and body composition"
        },
        "audience": {
            "@type": "Audience",
            "name": "Health-Conscious Individuals, Expecting Mothers, Fitness Enthusiasts"
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
                
                {/* Header Section - SEO Optimized (Theme Color: Blue) */}
                <div className="text-center mb-10 md:mb-12">
                    {/* Category Badge - Theme color (blue) - No green */}
                    <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        Health & Wellness
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Health Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">BMI, ideal weight, pregnancy due date, ovulation, water intake, and body type</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Track your wellness journey — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored (Blue) */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 200,000+ users</span>
                        <span className="flex items-center gap-1">✓ Used in 80+ countries</span>
                        <span className="flex items-center gap-1">✓ WHO standard formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>🩺 <span className="font-semibold text-blue-400">{calculators.length}+ health calculators</span> available — all free, all accurate</>
                    ) : (
                        <>🩺 <span className="font-semibold text-blue-400">New health calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">🩺</div>
                        <p className="text-gray-400 mb-2">More health calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for new wellness tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer - Only Content) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Health Calculators?</h2>
                            <p>
                                Our <strong className="text-white">health calculators</strong> are designed for health-conscious individuals, 
                                expecting mothers, fitness enthusiasts, and medical professionals. Each tool uses standard formulas from 
                                WHO (World Health Organization) and leading medical research.
                            </p>
                            <p>
                                The <strong className="text-white">BMI Calculator</strong> uses WHO standards to assess weight status 
                                (underweight, normal, overweight, obese). This helps you understand if your weight falls in a healthy 
                                range for your height.
                            </p>
                            <p>
                                Our <strong className="text-white">Pregnancy Due Date Calculator</strong> estimates your baby's arrival 
                                date based on the first day of your last menstrual period or conception date. Perfect for expectant 
                                mothers planning prenatal care and preparations.
                            </p>
                            <p>
                                The <strong className="text-white">Ovulation Calculator</strong> helps track fertile days for family 
                                planning. Enter your cycle length and last period date to identify your most fertile window.
                            </p>
                            <p>
                                The <strong className="text-white">Water Intake Calculator</strong> recommends daily hydration needs 
                                based on weight, activity level, and climate. The <strong className="text-white">Ideal Weight Calculator</strong> 
                                gives healthy weight ranges using multiple formulas (Devine, Robinson, Miller).
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your health data stays private and secure.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Health Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">BMI Calculator:</strong> Body Mass Index per WHO standards</li>
                                <li><strong className="text-white">Pregnancy Due Date:</strong> Estimate baby's arrival (Naegele's Rule)</li>
                                <li><strong className="text-white">Ovulation Tracker:</strong> Identify fertile days for family planning</li>
                                <li><strong className="text-white">Ideal Weight:</strong> Healthy weight range for your height</li>
                                <li><strong className="text-white">Water Intake:</strong> Daily hydration needs based on lifestyle</li>
                                <li><strong className="text-white">Body Type Calculator:</strong> Determine body shape (pear, apple, hourglass)</li>
                                <li><strong className="text-white">Sleep Timing:</strong> Optimal bedtime based on wake-up time</li>
                                <li><strong className="text-white">Nutrition Facts:</strong> Track calories and nutrients</li>
                            </ul>
                            
                            {/* Supported Formulas & Standards */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Medical Standards Used</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">WHO BMI Classification</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Naegele's Rule (Due Date)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Devine Formula (Ideal Weight)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Robinson Formula</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Miller Formula</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored (Blue) */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> Track your BMI and water intake together for better health outcomes. 
                                    Even small improvements in hydration can boost energy, skin health, and digestion. For pregnancy planning, 
                                    use our Ovulation Calculator consistently for 2-3 months to understand your unique cycle pattern.
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Disclaimer: These calculators provide estimates based on standard medical formulas. Individual results may vary. 
                                Always consult a qualified healthcare provider for medical advice, especially during pregnancy.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/fitness" className="text-blue-400 hover:underline mx-1">Fitness Calculators</a> • 
                            <a href="/cooking" className="text-blue-400 hover:underline mx-1">Nutrition Tools</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">🏥 WHO & Naegele's Rule standards | </span>
                            <span className="text-gray-500">Results are estimates — consult your doctor</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}