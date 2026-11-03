// components/blog/BmiChartTable.tsx
//
// A real BMI chart (weight ranges by height) shown at the top of the BMI chart
// guide, so people searching "bmi chart 2026" get the chart immediately instead
// of after a long introduction. Every number is computed from the standard adult
// BMI formula, so the table can never drift from the cut-offs it states.
//
// Server component: no JavaScript is sent to the browser.

import Link from 'next/link';

// Adult categories used by the CDC and WHO (age 20+), identical for men and women.
const CUTS = { healthy: 18.5, overweight: 25, obese: 30 };

/** Weight in pounds for a BMI at a height in inches: BMI x in^2 / 703. */
const lb = (bmi: number, inches: number) => (bmi * inches * inches) / 703;
/** Weight in kg for a BMI at a height in cm. */
const kg = (bmi: number, cm: number) => bmi * (cm / 100) ** 2;

const IMPERIAL_HEIGHTS = Array.from({ length: 31 }, (_, i) => 58 + i); // 4'10" .. 6'4"
const METRIC_HEIGHTS = Array.from({ length: 11 }, (_, i) => 145 + i * 5); // 145 .. 195 cm

const ft = (inches: number) => `${Math.floor(inches / 12)}′${inches % 12}″`;
const r = (n: number) => Math.round(n);

export default function BmiChartTable() {
  const th = 'text-left font-semibold text-ink-soft px-3 py-2 whitespace-nowrap';
  const td = 'px-3 py-1.5 whitespace-nowrap';
  return (
    <section aria-labelledby="bmi-chart-h" className="not-prose mb-8 rounded-2xl border border-hairline bg-surface p-4 sm:p-6">
      <h2 id="bmi-chart-h" className="text-xl sm:text-2xl font-bold text-ink mb-1">
        BMI chart for adults (men and women)
      </h2>
      <p className="text-sm text-ink-soft mb-4">
        The adult BMI categories are the same for men and women aged 20 and over. Find your height, then see which weight
        range you fall in. For an exact number, use the{' '}
        <Link href="/health/bmi-calculator" className="text-blue-700 underline">
          BMI calculator
        </Link>
        .
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 text-sm">
        <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2"><strong className="text-ink">Underweight</strong><br />below 18.5</div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2"><strong className="text-ink">Healthy weight</strong><br />18.5 to 24.9</div>
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2"><strong className="text-ink">Overweight</strong><br />25 to 29.9</div>
        <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2"><strong className="text-ink">Obesity</strong><br />30 or higher</div>
      </div>

      <h3 className="text-base font-semibold text-ink mb-2">BMI chart in feet and pounds</h3>
      <div className="overflow-x-auto rounded-lg border border-hairline mb-5">
        <table className="w-full text-sm">
          <caption className="sr-only">Weight ranges in pounds by height for each adult BMI category</caption>
          <thead className="bg-cream">
            <tr>
              <th scope="col" className={th}>Height</th>
              <th scope="col" className={th}>Healthy weight</th>
              <th scope="col" className={th}>Overweight</th>
              <th scope="col" className={th}>Obesity</th>
            </tr>
          </thead>
          <tbody>
            {IMPERIAL_HEIGHTS.map((h) => (
              <tr key={h} className="border-t border-hairline">
                <th scope="row" className={`${td} text-left font-medium text-ink`}>{ft(h)}</th>
                <td className={td}>{r(lb(CUTS.healthy, h))}–{r(lb(CUTS.overweight, h)) - 1} lb</td>
                <td className={td}>{r(lb(CUTS.overweight, h))}–{r(lb(CUTS.obese, h)) - 1} lb</td>
                <td className={td}>{r(lb(CUTS.obese, h))} lb or more</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-base font-semibold text-ink mb-2">BMI chart in centimeters and kilograms</h3>
      <div className="overflow-x-auto rounded-lg border border-hairline mb-4">
        <table className="w-full text-sm">
          <caption className="sr-only">Weight ranges in kilograms by height for each adult BMI category</caption>
          <thead className="bg-cream">
            <tr>
              <th scope="col" className={th}>Height</th>
              <th scope="col" className={th}>Healthy weight</th>
              <th scope="col" className={th}>Overweight</th>
              <th scope="col" className={th}>Obesity</th>
            </tr>
          </thead>
          <tbody>
            {METRIC_HEIGHTS.map((h) => (
              <tr key={h} className="border-t border-hairline">
                <th scope="row" className={`${td} text-left font-medium text-ink`}>{h} cm</th>
                <td className={td}>{kg(CUTS.healthy, h).toFixed(1)}–{(kg(CUTS.overweight, h) - 0.1).toFixed(1)} kg</td>
                <td className={td}>{kg(CUTS.overweight, h).toFixed(1)}–{(kg(CUTS.obese, h) - 0.1).toFixed(1)} kg</td>
                <td className={td}>{kg(CUTS.obese, h).toFixed(1)} kg or more</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-faint leading-relaxed">
        Calculated from BMI = weight (kg) ÷ height (m)², or 703 × weight (lb) ÷ height (in)², using the adult categories
        published by the CDC and the World Health Organization. BMI is a screening measure, not a diagnosis: it does not
        account for muscle, age or body shape. Children and teens use age- and sex-specific percentiles instead, and the WHO
        notes that lower cut-offs may be appropriate for some Asian populations. Talk to a doctor about your own health.
      </p>
    </section>
  );
}
