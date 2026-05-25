// components/calculators/CalculatorFactory.tsx
import dynamic from 'next/dynamic';
import { CalculatorType } from '@/data/calculatorsRegistry';

// Lazy load calculators for better performance
const CALCULATOR_COMPONENTS: Record<string, any> = {
  bmi: dynamic(() => import('./BMICalculator')),
  emi: dynamic(() => import('./EMICalculator')),
  gst: dynamic(() => import('./GSTCalculator')),
  // Add more as you create them
  // sip: dynamic(() => import('./templates/SIPCalculator')),
  // bmr: dynamic(() => import('./templates/BMRCalculator')),
  // percentage: dynamic(() => import('./templates/PercentageCalculator')),
  // age: dynamic(() => import('./templates/AgeCalculator')),
};

export function getCalculatorComponent(calculatorId: string) {
  return CALCULATOR_COMPONENTS[calculatorId] || null;
}

// This function checks if a calculator component exists
export function hasCalculatorComponent(calculatorId: string): boolean {
  return calculatorId in CALCULATOR_COMPONENTS;
}