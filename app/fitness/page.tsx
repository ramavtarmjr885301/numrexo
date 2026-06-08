"use client";

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';
import Head from 'next/head';

export default function FitnessCategoryPage() {
    const calculators = getCalculatorsByCategory('fitness');
    
    // SEO Data - Fitness & Health Focus
    const pageTitle = "Fitness Calculators: BMR, Body Fat, Calorie Burn, BMI, Water Intake & More | Numrexo";
    const pageDescription = "Free fitness calculators for BMR, body fat percentage, calorie burn, BMI, water intake, and ideal weight. Trusted by 100,000+ fitness enthusiasts and trainers worldwide.";
    const pageUrl = "https://numrexo.com/fitness";
    const siteName = "Numrexo";
    
    // Structured Data for Fitness Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Fitness Calculators",
        "description": "Free professional fitness calculators for body composition, calorie tracking, and workout planning.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Fitness & Body Composition Tools",
            "description": "Tools for BMR calculation, body fat estimation, calorie burn tracking, and fitness goal planning"
        },
        "audience": {
            "@type": "Audience",
            "name": "Fitness Enthusiasts, Personal Trainers, Athletes, Weight Loss Seekers"
        }
    };
    
    return (
        <>
            {/* SEO Meta Tags - Fitness Specific */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="fitness calculators, BMR calculator, body fat calculator, calorie burn calculator, BMI calculator, water intake calculator, ideal weight calculator, fitness tracker, workout planner" />
                <meta name="author" content="Numrexo" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Fitness Calculators | BMR, Body Fat, Calorie Burn & BMI Tools" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Fitness Calculators | Track Your Health Goals" />
                <meta name="twitter:description" content="Free fitness calculators. BMR, body fat, calorie burn, BMI, and more. Trusted by fitness enthusiasts worldwide." />
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
                        Health & Fitness
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Fitness Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">BMR, body fat percentage, daily calorie burn, BMI, water intake, and ideal weight</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Track your fitness journey — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 100,000+ fitness enthusiasts</span>
                        <span className="flex items-center gap-1">✓ Used in 70+ countries</span>
                        <span className="flex items-center gap-1">✓ WHO & ACSM standard formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>💪 <span className="font-semibold text-blue-400">{calculators.length}+ fitness calculators</span> available — all free, all accurate</>
                    ) : (
                        <>💪 <span className="font-semibold text-blue-400">New fitness calculators</span> being added weekly — check back soon!</>
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
                                priority={index < 3}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-[#111827] rounded-xl border border-gray-800">
                        <div className="text-5xl mb-4">💪</div>
                        <p className="text-gray-400 mb-2">More fitness calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for BMR and calorie tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Fitness Calculators?</h2>
                            <p>
                                Our <strong className="text-white">fitness calculators</strong> are designed for gym-goers, 
                                personal trainers, athletes, weight loss seekers, and anyone on a fitness journey. 
                                Each tool uses standard formulas from WHO (World Health Organization), ACSM (American College 
                                of Sports Medicine), and leading fitness research.
                            </p>
                            <p>
                                The <strong className="text-white">BMR Calculator</strong> (Basal Metabolic Rate) tells you how 
                                many calories your body burns at complete rest. This is your foundation for weight loss or 
                                muscle gain — eat below BMR to lose weight, above to gain.
                            </p>
                            <p>
                                Our <strong className="text-white">Body Fat Calculator</strong> uses the US Navy Method 
                                (based on circumference measurements) to estimate your body fat percentage. Unlike BMI, 
                                body fat percentage gives you a true picture of your body composition.
                            </p>
                            <p>
                                The <strong className="text-white">Calorie Burn Calculator</strong> estimates calories burned 
                                during various activities — walking, running, cycling, swimming, weight training, and more. 
                                Perfect for tracking workout effectiveness.
                            </p>
                            <p>
                                Our <strong className="text-white">BMI Calculator</strong> follows WHO standards to assess 
                                weight categories (underweight, normal, overweight, obese). The <strong className="text-white">
                                Water Intake Calculator</strong> recommends daily hydration based on weight, activity level, 
                                and climate. The <strong className="text-white">Ideal Weight Calculator</strong> gives you 
                                healthy weight ranges based on height and body frame.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your health data stays private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Fitness Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">BMR Calculator:</strong> Basal metabolic rate for calorie planning</li>
                                <li><strong className="text-white">Body Fat Percentage:</strong> US Navy Method — accurate body composition</li>
                                <li><strong className="text-white">Calorie Burn:</strong> Calories burned during 50+ activities</li>
                                <li><strong className="text-white">BMI Calculator:</strong> Body Mass Index per WHO standards</li>
                                <li><strong className="text-white">Water Intake:</strong> Daily hydration needs based on lifestyle</li>
                                <li><strong className="text-white">Ideal Weight:</strong> Healthy weight range for your height</li>
                                <li><strong className="text-white">Calorie Deficit:</strong> How many calories to cut for weight loss</li>
                                <li><strong className="text-white">Macro Calculator:</strong> Protein, carbs, fats for your goals</li>
                            </ul>
                            
                            {/* Supported Formulas & Standards */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Scientific Standards Used</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Mifflin-St Jeor (BMR)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Harris-Benedict (BMR)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">US Navy Method (Body Fat)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">WHO BMI Classification</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">ACSM Activity Multipliers</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> Calculate your BMR first, then multiply by 
                                    your activity level (sedentary to very active) to get your TDEE (Total Daily Energy Expenditure). 
                                    For weight loss, eat 300-500 calories below TDEE. For muscle gain, eat 300-500 above.
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Disclaimer: These calculators provide estimates based on standard formulas. Individual results may vary. 
                                Consult a doctor or certified trainer before starting any fitness or nutrition program.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/health" className="text-blue-400 hover:underline mx-1">Health Calculators</a> • 
                            <a href="/cooking" className="text-blue-400 hover:underline mx-1">Nutrition Tools</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">🏋️ ACSM & WHO standard formulas | </span>
                            <span className="text-gray-500">Results are estimates — listen to your body</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}