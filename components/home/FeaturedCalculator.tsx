// components/home/FeaturedCalculator.tsx
//
// The "Featured" highlight shown right under the home-page hero. It reads the
// calculator flagged `featured: true` in data/calculatorsRegistry.ts, so moving
// the spotlight to another tool later is a one-line registry change. Renders
// nothing if no calculator is flagged.

import Link from "next/link";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";

const BENEFITS = [
  "Assets and liabilities in one place",
  "Liquid assets and debt-to-asset ratio",
  "Compare with US medians by age",
];

export default function FeaturedCalculator() {
  const calc = CALCULATORS_REGISTRY.find((c) => c.featured);
  if (!calc) return null;

  return (
    <section className="px-4 sm:px-6 py-6 sm:py-8" aria-labelledby="featured-heading">
      <div className="max-w-6xl mx-auto">
        <div className="bg-surface border border-hairline rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-center shadow-sm">
          <div
            className="hidden md:flex w-20 h-20 rounded-2xl items-center justify-center text-4xl"
            style={{ backgroundColor: calc.bg }}
            aria-hidden="true"
          >
            {calc.icon}
          </div>

          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 mb-3">
              New · Featured
            </span>
            <h2 id="featured-heading" className="text-xl sm:text-2xl font-bold text-ink mb-2">
              {calc.name}
            </h2>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-2xl mb-4">
              Add up what you own and what you owe to see where you stand. The results update as you type, and
              the example is pre-filled so you can see how it works before entering your own numbers.
            </p>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink-soft">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold" aria-hidden="true">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link
              href={calc.path}
              className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors no-underline"
            >
              Try the {calc.name} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
