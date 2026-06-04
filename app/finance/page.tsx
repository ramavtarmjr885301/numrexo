
"use client";
import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function FinanceCategoryPage() {
    const calculators = getCalculatorsByCategory('finance');
    return (
        <div className="px-6 py-12 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Finance Calculators</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.map((calc) => (
                    <CalculatorCard key={calc.id} calculator={calc} onClick={() => window.location.href = calc.path} />
                ))}
            </div>
        </div>
    );
}