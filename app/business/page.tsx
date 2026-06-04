import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function BusinessCategoryPage() {
    const calculators = getCalculatorsByCategory('business');
    return (
        <div className="px-6 py-12 max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Business Calculators</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">Calculate profit margin, discount, ROI, break-even, and more. Make smarter business decisions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.map((calc) => (
                    <CalculatorCard key={calc.id} calculator={calc} onClick={() => window.location.href = calc.path} />
                ))}
            </div>
        </div>
    );
}