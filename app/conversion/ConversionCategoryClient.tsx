"use client";

// app/conversion/ConversionCategoryClient.tsx
//
// Client half of the conversion category page. It was previously app/conversion/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/conversion/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function ConversionCategoryClient() {
    const calculators = getCalculatorsByCategory('conversion');
    return (
        <div className="px-6 py-12 max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Unit Converters</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">Convert currencies, length, weight, temperature, and more. Fast and accurate conversions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.map((calc) => (
                    <CalculatorCard key={calc.id} calculator={calc} onClick={() => window.location.href = calc.path} />
                ))}
            </div>
        </div>
    );
}