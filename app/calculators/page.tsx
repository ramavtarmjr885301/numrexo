"use client";

import { useRouter } from "next/navigation";
import CalculatorCard from "@/components/common/CalculatorCard";
import { CALCULATORS } from "@/data/calculators";

export default function CalculatorsPage() {
  const router = useRouter();

  return (
    <section className="px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">All Tools</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Browse All Calculators</h1>
          <p className="text-gray-400">Free, accurate calculators for health, finance, tax, and everyday math.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CALCULATORS.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} onClick={() => router.push(calc.path)} />
          ))}
        </div>
      </div>
    </section>
  );
}