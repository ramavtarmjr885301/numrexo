"use client";

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';
import Head from 'next/head';

export default function CookingCategoryPage() {
    const calculators = getCalculatorsByCategory('cooking');
    
    // SEO Data - Cooking & Kitchen Focus (Not Homepage)
    const pageTitle = "Cooking Calculators: Recipe Converter, Oven Temperature, Cups to Grams & More | Numrexo";
    const pageDescription = "Free cooking calculators for recipe scaling, oven temperature conversion, cups to grams, cooking time adjustment, and nutrition facts. Perfect for home cooks and professional chefs.";
    const pageUrl = "https://numrexo.com/cooking";
    const siteName = "Numrexo";
    
    // Structured Data for Cooking Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Cooking & Kitchen Calculators",
        "description": "Free professional cooking calculators for recipe conversion, temperature conversion, measurement conversion, and kitchen planning.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Kitchen & Recipe Tools",
            "description": "Tools for recipe scaling, oven temperature conversion, cooking measurement conversion, and nutrition calculation"
        }
    };
    
    return (
        <>
            {/* SEO Meta Tags - Cooking Specific */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="cooking calculators, recipe converter, oven temperature converter, cups to grams, cooking time calculator, nutrition facts calculator, kitchen measurement converter, recipe scaling calculator, baking calculator" />
                <meta name="author" content="Numrexo" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Cooking Calculators | Recipe Converter, Oven Temp & Measurement Tools" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Cooking Calculators | Kitchen Tools for Home Cooks" />
                <meta name="twitter:description" content="Free cooking calculators. Recipe scaling, oven temperature, cups to grams, and more. Perfect for home cooks." />
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
                        Food & Kitchen
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Cooking & Kitchen Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Scale recipes, convert <strong className="text-white">cups to grams</strong>, adjust <strong className="text-white">oven temperatures</strong>, 
                        calculate cooking times, and generate <strong className="text-white">nutrition facts</strong>. Make your time in the kitchen easier and more precise.
                        <span className="block mt-2 text-blue-400 text-sm">100% free — no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 50,000+ home cooks</span>
                        <span className="flex items-center gap-1">✓ Used in 60+ countries</span>
                        <span className="flex items-center gap-1">✓ Professional recipe standards</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count + Status Message */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>🍳 <span className="font-semibold text-blue-400">{calculators.length}+ cooking calculators</span> available — all free, all accurate</>
                    ) : (
                        <>🍳 <span className="font-semibold text-blue-400">New cooking calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">🍳</div>
                        <p className="text-gray-400 mb-2">More cooking calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for recipe converter and measurement tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Cooking Calculators?</h2>
                            <p>
                                Our <strong className="text-white">cooking calculators</strong> are designed for home cooks, professional chefs, 
                                bakers, and nutrition enthusiasts. Each tool uses standard culinary measurements and professional formulas 
                                to ensure accurate results every time.
                            </p>
                            <p>
                                The <strong className="text-white">Recipe Scale Converter</strong> helps you adjust any recipe for different serving sizes — 
                                perfect for meal prep, parties, or family dinners. Simply enter your original recipe quantities and desired servings, 
                                and get instantly scaled measurements.
                            </p>
                            <p>
                                Our <strong className="text-white">Oven Temperature Converter</strong> instantly converts between Celsius, Fahrenheit, 
                                and gas mark. No more guessing whether 180°C is 350°F or gas mark 4. The <strong className="text-white">Cups to Grams Converter</strong> 
                                handles flour, sugar, butter, and hundreds of ingredients with ingredient-specific density calculations.
                            </p>
                            <p>
                                The <strong className="text-white">Cooking Time Adjuster</strong> recalculates roasting, baking, or slow cooking times when 
                                you change recipe quantities. The <strong className="text-white">Nutrition Facts Generator</strong> helps you track calories, 
                                protein, carbs, and fats for any recipe.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations happen in your browser — 
                                your recipes stay private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases & Measurements */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Kitchen Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">Recipe Scaling:</strong> Convert any recipe from 2 servings to 10 servings instantly</li>
                                <li><strong className="text-white">Oven Temperature:</strong> Convert between °C, °F, and gas mark (1-9)</li>
                                <li><strong className="text-white">Cups to Grams:</strong> Accurate conversions for flour, sugar, butter, milk, and more</li>
                                <li><strong className="text-white">Cooking Time Adjustment:</strong> Automatically adjust baking/roasting time when scaling recipes</li>
                                <li><strong className="text-white">Nutrition Facts:</strong> Calculate calories, protein, carbs, fats per serving</li>
                                <li><strong className="text-white">Food Freshness:</strong> Track expiration dates and storage times for ingredients</li>
                                <li><strong className="text-white">Measurement Converter:</strong> Convert between tsp, tbsp, cups, ml, liters, and ounces</li>
                            </ul>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> For baking, always weigh ingredients instead of using cups — 
                                    our cups to grams calculator gives you precise weights for consistent results every time.
                                </p>
                            </div>
                            
                            {/* Popular Ingredients List */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Common Ingredient Conversions</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">All-purpose flour</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Granulated sugar</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Brown sugar</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Butter</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Milk</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Honey</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Oats</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Cocoa powder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/converters" className="text-blue-400 hover:underline mx-1">Unit Converters</a> • 
                            <a href="/health" className="text-blue-400 hover:underline mx-1">Nutrition Calculators</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">🍴 Standard US and metric measurements | </span>
                            <span className="text-gray-500">Results are estimates — adjust to taste</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}