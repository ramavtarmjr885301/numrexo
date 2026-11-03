"use client";

// components/calculators/TurkeyThawingTimeCalculator.tsx
//
// How long a frozen turkey takes to thaw (refrigerator or cold water) and the
// date it has to go into the fridge to be ready on the day. USDA figures, see
// lib/turkey.ts.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ResultBox from "@/components/common/ResultBox";
import { KG_PER_LB, USDA_SOURCE, coldWaterThawHours, fridgeThawDays, hoursLabel, nextThanksgiving } from "@/lib/turkey";

const FRIDGE_CHART = [
  { w: "4 to 12 lb", t: "1 to 3 days" },
  { w: "12 to 16 lb", t: "3 to 4 days" },
  { w: "16 to 20 lb", t: "4 to 5 days" },
  { w: "20 to 24 lb", t: "5 to 6 days" },
];
const WATER_CHART = [
  { w: "4 to 12 lb", t: "2 to 6 hours" },
  { w: "12 to 16 lb", t: "6 to 8 hours" },
  { w: "16 to 20 lb", t: "8 to 10 hours" },
  { w: "20 to 24 lb", t: "10 to 12 hours" },
];

const FAQ = [
  {
    q: "How long does it take to thaw a turkey in the fridge?",
    a: "Allow about 24 hours for every 4 to 5 pounds in a refrigerator at 40°F or below. A 15 lb turkey takes roughly 3 to 4 days, and a 20 lb turkey 4 to 5 days.",
  },
  {
    q: "How long does a turkey take to thaw in cold water?",
    a: "About 30 minutes per pound. Keep the turkey in a leak-proof bag, submerge it in cold tap water and change the water every 30 minutes. A turkey thawed this way must be cooked immediately.",
  },
  {
    q: "When should I take the turkey out of the freezer for Thanksgiving?",
    a: "Count back from Thanksgiving using about one day in the fridge for every 4 to 5 pounds. For a 15 to 16 lb turkey, move it to the refrigerator by the Sunday before Thanksgiving. This calculator works out the exact date for your turkey's weight.",
  },
  {
    q: "How long can a thawed turkey stay in the fridge?",
    a: "A turkey thawed in the refrigerator keeps for 1 to 2 days before cooking. If plans change, a refrigerator-thawed turkey can be refrozen. A turkey thawed in cold water or in the microwave should be cooked right away.",
  },
  {
    q: "Can I thaw a turkey on the counter?",
    a: "No. The USDA advises against thawing on the counter, because the outside of the bird warms into the temperature range where bacteria multiply while the inside is still frozen. Use the refrigerator, cold water or the microwave.",
  },
];

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
const APP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Turkey Thawing Time Calculator",
  url: "https://numrexo.com/cooking/turkey-thawing-time-calculator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "How long a frozen turkey takes to thaw in the fridge or cold water, and the date to start.",
});
const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://numrexo.com/cooking" },
    { "@type": "ListItem", position: 3, name: "Turkey Thawing Time Calculator", item: "https://numrexo.com/cooking/turkey-thawing-time-calculator" },
  ],
});

function longDate(ymd: string, offsetDays = 0): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, m - 1, d - offsetDays);
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(dt);
}

export default function TurkeyThawingTimeCalculator() {
  const [weight, setWeight] = useState("15");
  const [unit, setUnit] = useState<"lb" | "kg">("lb");
  const [cookDate, setCookDate] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Default the cooking day to the next Thanksgiving, after hydration (it depends on today's date).
  useEffect(() => {
    setCookDate((d) => d || nextThanksgiving(new Date()));
  }, []);

  const weightLb = useMemo(() => {
    const w = parseFloat(weight);
    if (!Number.isFinite(w) || w <= 0 || w > 60) return null;
    return unit === "kg" ? w / KG_PER_LB : w;
  }, [weight, unit]);

  const days = weightLb ? fridgeThawDays(weightLb) : null;
  const waterH = weightLb ? coldWaterThawHours(weightLb) : null;
  const daysBack = days ? Math.ceil(days.max) : 0;
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(cookDate);

  const field = "w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink";
  const toggle = (on: boolean) =>
    `py-2 px-4 rounded-lg text-sm font-medium transition-all ${on ? "bg-blue-600 text-white" : "bg-surface border border-hairline text-ink"}`;
  // Shown in half days (3–4 days, 4.5–5.5 days): more honest than "3.8 days" for an estimate.
  const fmtDays = (n: number, up: boolean) => ((up ? Math.ceil(n * 2) : Math.floor(n * 2)) / 2).toString();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: APP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-hairline">
            <h2 className="font-semibold">Your frozen turkey</h2>
            <p className="text-xs text-ink-faint mt-1">Refrigerator at 40°F or below</p>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
              <div>
                <label htmlFor="th-weight" className="block text-xs font-semibold text-ink-faint mb-2">Turkey weight</label>
                <input id="th-weight" type="number" inputMode="decimal" min="1" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} className={field} />
              </div>
              <div className="grid grid-cols-2 gap-1" role="group" aria-label="Weight unit">
                <button type="button" aria-pressed={unit === "lb"} className={toggle(unit === "lb")} onClick={() => setUnit("lb")}>lb</button>
                <button type="button" aria-pressed={unit === "kg"} className={toggle(unit === "kg")} onClick={() => setUnit("kg")}>kg</button>
              </div>
            </div>
            <div>
              <label htmlFor="th-date" className="block text-xs font-semibold text-ink-faint mb-2">Day you will cook it</label>
              <input id="th-date" type="date" value={cookDate} onChange={(e) => setCookDate(e.target.value)} className={field} />
            </div>
            <p className="text-xs text-ink-faint">
              Then work out the oven time with the{" "}
              <Link href="/cooking/turkey-cooking-time-calculator" className="text-blue-700 underline">turkey cooking time calculator</Link>.
            </p>
          </div>
        </div>

        <ResultBox
          title="Thawing time"
          isEmpty={!days}
          emptyIcon="🧊"
          emptyText="Enter the turkey's weight"
          mainResult={
            days
              ? { label: "In the refrigerator", value: `${fmtDays(days.min, false)}–${fmtDays(days.max, true)} days`, color: "text-sky-300" }
              : undefined
          }
          extraRows={
            days && weightLb && waterH !== null
              ? [
                  ...(validDate
                    ? [{ label: "Move it to the fridge by", value: longDate(cookDate, daysBack), valueColor: "text-emerald-400" }]
                    : []),
                  { label: "Weight", value: `${weightLb.toFixed(1)} lb (${(weightLb * KG_PER_LB).toFixed(1)} kg)` },
                  { label: "In cold water instead", value: `about ${hoursLabel(waterH)}, then cook immediately` },
                  { label: "Once thawed, it keeps in the fridge", value: "1 to 2 days" },
                ]
              : []
          }
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">Turkey thawing time chart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "In the refrigerator (24 hours per 4–5 lb)", rows: FRIDGE_CHART },
            { title: "In cold water (30 minutes per lb)", rows: WATER_CHART },
          ].map((t) => (
            <div key={t.title} className="bg-surface border border-hairline rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="text-left px-4 pt-3 pb-1 font-semibold text-ink">{t.title}</caption>
                <thead>
                  <tr className="border-b border-hairline">
                    <th scope="col" className="text-left py-2 px-4 text-ink-faint">Weight</th>
                    <th scope="col" className="text-left py-2 px-4 text-ink-faint">Thawing time</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.w} className="border-b border-hairline last:border-0">
                      <th scope="row" className="text-left font-medium py-2 px-4 text-ink-soft">{r.w}</th>
                      <td className="py-2 px-4 text-ink-faint">{r.t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">The three safe ways to thaw a turkey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-hairline rounded-xl p-4">
            <h3 className="text-sm font-semibold text-ink mb-2">Refrigerator (easiest)</h3>
            <p className="text-ink-faint text-xs leading-relaxed">Leave it in its wrapping on a tray to catch drips. Allow a day for every 4 to 5 pounds. It keeps 1 to 2 days once thawed, which gives you slack if plans change.</p>
          </div>
          <div className="bg-surface border border-hairline rounded-xl p-4">
            <h3 className="text-sm font-semibold text-ink mb-2">Cold water (fastest)</h3>
            <p className="text-ink-faint text-xs leading-relaxed">Seal it in a leak-proof bag, submerge it in cold tap water and change the water every 30 minutes. About 30 minutes per pound. Cook it as soon as it is thawed.</p>
          </div>
          <div className="bg-surface border border-hairline rounded-xl p-4">
            <h3 className="text-sm font-semibold text-ink mb-2">Microwave (small birds only)</h3>
            <p className="text-ink-faint text-xs leading-relaxed">Follow the microwave maker's instructions for size and power. Parts may start cooking, so roast it immediately afterwards.</p>
          </div>
        </div>
        <p className="text-ink-faint text-sm leading-relaxed mt-4">
          Never thaw a turkey on the counter or in the garage: the outside warms to unsafe temperatures long before the center
          thaws. Forgot to thaw it? You can roast it from frozen; plan on at least 50 percent more oven time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-4">Frequently asked questions</h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
              <button type="button" aria-expanded={openFaq === i} className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-ink">{item.q}</span>
                <span className={`text-ink-faint text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={openFaq === i ? "pb-4" : "sr-only"}>
                <p className="px-5 text-sm text-ink-faint leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-4">
          Source:{" "}
          <a href={USDA_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">{USDA_SOURCE.label}</a>.
        </p>
      </section>
    </>
  );
}
