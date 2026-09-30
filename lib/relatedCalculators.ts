// lib/relatedCalculators.ts
//
// Moved out of the old app/wordpress.ts (which otherwise has nothing to do
// with WordPress) - maps a blog category to a handful of calculators to
// cross-link from the bottom of each post.

import { CALCULATORS_REGISTRY, CalculatorType } from '@/data/calculatorsRegistry';

const CATEGORY_CALCULATOR_MAP: Record<string, string[]> = {
  finance: ['home-loan-emi', 'personal-loan-emi', 'car-loan-emi', 'bike-loan-emi', 'consumer-loan-emi', 'home-loan-eligibility', 'amortization', 'credit-score-estimator', 'loan-prepayment', 'emi', 'cagr', 'mortgage'],
  'home-loan': ['home-loan-emi', 'home-loan-eligibility', 'amortization', 'loan-prepayment', 'mortgage'],
  'car-loan': ['car-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
  'bike-loan': ['bike-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
  'personal-loan': ['personal-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
  'consumer-loan': ['consumer-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
  investment: ['sip', 'lumpsum', 'ppf', 'nps', 'swp', 'capm', 'xirr', 'cagr'],
  tax: ['ltcg', 'property-tax', 'vat', 'sales-tax', 'gst'],
  health: ['bmi', 'ideal-weight', 'water-intake', 'body-type', 'pregnancy-due', 'ovulation', 'sleep', 'calorie-counter'],
  fitness: ['bmr', 'body-fat', 'calorie-burn', 'pace'],
  math: ['percentage', 'age', 'fraction', 'decimal', 'ratio', 'pythagorean', 'area', 'volume', 'slope', 'quadratic', 'mean-median-mode', 'distance', 'population'],
  conversion: ['currency-converter', 'unit-converter', 'length-converter', 'weight-converter', 'temperature-converter', 'area-converter', 'volume-converter', 'speed-converter', 'time-converter', 'data-converter', 'pressure-converter', 'energy-converter', 'power-converter', 'angle-converter'],
  education: ['gpa', 'cgpa', 'grade', 'weighted-grade', 'final-grade', 'college-cost', 'scholarship', 'attendance', 'percentage-marks'],
  construction: ['carpet-area', 'built-up-area', 'concrete', 'paint', 'flooring', 'wallpaper', 'roofing', 'land-area'],
  business: ['profit-margin', 'markup', 'discount', 'roi', 'break-even', 'invoice', 'tip', 'sales-commission'],
  cooking: ['recipe-converter', 'cooking-time', 'oven-temperature', 'baking-converter', 'food-expiry'],
  travel: ['fuel-cost', 'travel-budget', 'flight-time', 'hotel-cost', 'luggage-allowance'],
  time: ['date-difference', 'add-days', 'work-days', 'time-duration', 'birthday-countdown', 'stopwatch', 'timer'],
  science: ['distance-speed-time'],
};

export function getRelatedCalculators(categorySlug: string, limit = 4): CalculatorType[] {
  const calculatorIds = CATEGORY_CALCULATOR_MAP[categorySlug] || CATEGORY_CALCULATOR_MAP['finance'];
  return calculatorIds
    .map((id) => CALCULATORS_REGISTRY.find((calc) => calc.id === id))
    .filter((calc): calc is CalculatorType => calc !== undefined)
    .slice(0, limit);
}
