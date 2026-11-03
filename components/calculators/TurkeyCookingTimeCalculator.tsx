"use client";

// components/calculators/TurkeyCookingTimeCalculator.tsx
//
// How long to roast a whole turkey, and what time it has to go in the oven to be
// carved on time. Times come from the USDA roasting timetable (lib/turkey.ts).

import { useMemo, useState } from "react";
import Link from "next/link";
import ResultBox from "@/components/common/ResultBox";
import {
  KG_PER_LB,
  OVEN_TEMP_F,
  REST_MIN,
  SAFE_TEMP_F,
  STUFFED,
  UNSTUFFED,
  USDA_SOURCE,
  fractionHours,
  hoursLabel,
  roastBand,
} from "@/lib/turkey";

const FAQ = [
  {
    q: "How long do I cook a 15 lb turkey?",
    a: "At 325°F, the USDA estimates 3¾ to 4¼ hours for an unstuffed 14 to 18 lb turkey and 4 to 4¼ hours if it is stuffed. Start checking with a thermometer at the low end. It is done when the thickest part of the inner thigh reads 165°F, then let it rest about 20 minutes before carving.",
  },
  {
    q: "What temperature should I cook a turkey at?",
    a: "The USDA recommends an oven set no lower than 325°F. The timetable on this page is for 325°F. Whatever the oven temperature, the turkey is safe when a food thermometer reads 165°F in the thickest part of the inner thigh, without touching bone.",
  },
  {
    q: "How long should a turkey rest before carving?",
    a: "About 20 minutes. Resting lets the juices settle so the meat carves cleanly. This calculator adds 20 minutes of resting to the schedule, so the time it gives you to put the turkey in the oven already allows for it.",
  },
  {
    q: "Does a stuffed turkey take longer to cook?",
    a: "Yes, usually 15 to 30 minutes longer, because heat has to reach the center of the stuffing. The stuffing itself must reach 165°F. Many cooks bake the stuffing separately in a dish, which cooks more evenly and shortens the turkey's time.",
  },
  {
    q: "How much turkey do I need per person?",
    a: "A common rule of thumb is 1 to 1½ pounds of whole turkey per person, toward the higher end if you want leftovers. A 15 lb turkey therefore serves roughly 10 to 15 people.",
  },
  {
    q: "Can I cook a turkey that is still frozen?",
    a: "Yes. USDA guidance says a turkey cooked from frozen takes at least 50 percent longer than a thawed one, and you should remove the giblet bag once it loosens during cooking. Thawing first in the refrigerator is easier to time; use our turkey thawing time calculator to plan it.",
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
  name: "Turkey Cooking Time Calculator",
  url: "https://numrexo.com/cooking/turkey-cooking-time-calculator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Roasting time for a whole turkey by weight, stuffed or unstuffed, with the time to put it in the oven.",
});
const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://numrexo.com/cooking" },
    { "@type": "ListItem", position: 3, name: "Turkey Cooking Time Calculator", item: "https://numrexo.com/cooking/turkey-cooking-time-calculator" },
  ],
});

/** "2:15 PM" for minutes since midnight (wraps across days). */
function clock(minutes: number): { label: string; dayShift: number } {
  const dayShift = Math.floor(minutes / 1440);
  const m = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mm = m % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return { label: `${h12}:${String(mm).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`, dayShift };
}

export default function TurkeyCookingTimeCalculator() {
  const [weight, setWeight] = useState("15");
  const [unit, setUnit] = useState<"lb" | "kg">("lb");
  const [stuffed, setStuffed] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [eatAt, setEatAt] = useState("16:00");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const weightLb = useMemo(() => {
    const w = parseFloat(weight);
    if (!Number.isFinite(w) || w <= 0) return null;
    return unit === "kg" ? w / KG_PER_LB : w;
  }, [weight, unit]);

  const band = weightLb ? roastBand(weightLb, stuffed) : null;
  const factor = frozen ? 1.5 : 1;

  const schedule = useMemo(() => {
    if (!band) return null;
    const m = /^(\d{2}):(\d{2})$/.exec(eatAt);
    if (!m) return null;
    const eatMin = Number(m[1]) * 60 + Number(m[2]);
    const maxMin = Math.round(band.maxH * 60 * factor);
    const minMin = Math.round(band.minH * 60 * factor);
    const inOven = eatMin - REST_MIN - maxMin; // allows for the longest estimate
    return {
      inOven: clock(inOven),
      checkFrom: clock(inOven + minMin),
      outBy: clock(eatMin - REST_MIN),
    };
  }, [band, eatAt, factor]);

  const table = stuffed ? STUFFED : UNSTUFFED;
  const minLb = table[0].minLb;
  const maxLb = table[table.length - 1].maxLb;
  const outOfRange = weightLb !== null && !band;

  const field = "w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink";
  const toggle = (on: boolean) =>
    `py-2 rounded-lg text-sm font-medium transition-all ${on ? "bg-blue-600 text-white" : "bg-surface border border-hairline text-ink"}`;
  const dayNote = (d: number) => (d < 0 ? " (day before)" : d > 0 ? " (next day)" : "");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: APP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-hairline">
            <h2 className="font-semibold">Your turkey</h2>
            <p className="text-xs text-ink-faint mt-1">Whole turkey, conventional oven at {OVEN_TEMP_F}°F</p>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
              <div>
                <label htmlFor="tk-weight" className="block text-xs font-semibold text-ink-faint mb-2">Turkey weight</label>
                <input id="tk-weight" type="number" inputMode="decimal" min="1" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} className={field} />
              </div>
              <div className="grid grid-cols-2 gap-1" role="group" aria-label="Weight unit">
                <button type="button" aria-pressed={unit === "lb"} className={`${toggle(unit === "lb")} px-4`} onClick={() => setUnit("lb")}>lb</button>
                <button type="button" aria-pressed={unit === "kg"} className={`${toggle(unit === "kg")} px-4`} onClick={() => setUnit("kg")}>kg</button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-ink-faint mb-2" id="tk-stuffed">Stuffing</span>
              <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="tk-stuffed">
                <button type="button" aria-pressed={!stuffed} className={toggle(!stuffed)} onClick={() => setStuffed(false)}>Unstuffed</button>
                <button type="button" aria-pressed={stuffed} className={toggle(stuffed)} onClick={() => setStuffed(true)}>Stuffed</button>
              </div>
            </div>

            <div>
              <label htmlFor="tk-eat" className="block text-xs font-semibold text-ink-faint mb-2">When do you want to eat?</label>
              <input id="tk-eat" type="time" value={eatAt} onChange={(e) => setEatAt(e.target.value)} className={field} />
            </div>

            <label className="flex items-start gap-3 text-sm text-ink-soft">
              <input type="checkbox" checked={frozen} onChange={(e) => setFrozen(e.target.checked)} className="mt-1" />
              <span>The turkey is still frozen (USDA: allow at least 50% longer)</span>
            </label>

            <p className="text-xs text-ink-faint">
              Not thawed yet? Plan it with the{" "}
              <Link href="/cooking/turkey-thawing-time-calculator" className="text-blue-700 underline">turkey thawing time calculator</Link>.
            </p>
          </div>
        </div>

        <ResultBox
          title="Roasting time"
          isEmpty={!band}
          emptyIcon="🦃"
          emptyText={
            outOfRange
              ? `The USDA timetable covers ${minLb} to ${maxLb} lb ${stuffed ? "stuffed" : "unstuffed"} turkeys. Outside that range, roast at ${OVEN_TEMP_F}°F and go by a thermometer (${SAFE_TEMP_F}°F).`
              : "Enter the turkey's weight"
          }
          mainResult={
            band
              ? {
                  label: `${stuffed ? "Stuffed" : "Unstuffed"} turkey at ${OVEN_TEMP_F}°F`,
                  value: `${hoursLabel(band.minH * factor)} – ${hoursLabel(band.maxH * factor)}`,
                  color: "text-amber-300",
                }
              : undefined
          }
          extraRows={
            band && weightLb
              ? [
                  { label: "Weight", value: `${weightLb.toFixed(1)} lb (${(weightLb * KG_PER_LB).toFixed(1)} kg)` },
                  ...(schedule
                    ? [
                        { label: "Put it in the oven by", value: `${schedule.inOven.label}${dayNote(schedule.inOven.dayShift)}`, valueColor: "text-emerald-400" },
                        { label: "Start checking the temperature at", value: schedule.checkFrom.label },
                        { label: "Take it out by", value: `${schedule.outBy.label}, then rest ${REST_MIN} min` },
                      ]
                    : []),
                  { label: "Done when the inner thigh reads", value: `${SAFE_TEMP_F}°F` },
                  ...(stuffed ? [{ label: "Center of the stuffing", value: `${SAFE_TEMP_F}°F` }] : []),
                  { label: "Feeds about", value: `${Math.floor(weightLb / 1.5)}–${Math.floor(weightLb)} people` },
                ]
              : []
          }
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">Turkey cooking time chart (325°F)</h2>
        <p className="text-ink-faint text-sm leading-relaxed mb-4">
          USDA roasting times for a whole turkey in a conventional oven set to 325°F. They are estimates: ovens, pans and how cold
          the bird is when it goes in all change the time, so start checking with a food thermometer at the low end.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Unstuffed turkey", rows: UNSTUFFED },
            { title: "Stuffed turkey", rows: STUFFED },
          ].map((t) => (
            <div key={t.title} className="bg-surface border border-hairline rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="text-left px-4 pt-3 pb-1 font-semibold text-ink">{t.title}</caption>
                <thead>
                  <tr className="border-b border-hairline">
                    <th scope="col" className="text-left py-2 px-4 text-ink-faint">Weight</th>
                    <th scope="col" className="text-left py-2 px-4 text-ink-faint">Time at 325°F</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.minLb} className="border-b border-hairline last:border-0">
                      <th scope="row" className="text-left font-medium py-2 px-4 text-ink-soft">
                        {r.minLb}–{r.maxLb} lb{r.note ? ` (${r.note})` : ""}
                      </th>
                      <td className="py-2 px-4 text-ink-faint">{fractionHours(r.minH)} to {fractionHours(r.maxH)} hours</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">How to tell when the turkey is done</h2>
        <p className="text-ink-faint text-sm leading-relaxed mb-3">
          Time gets you close; a thermometer tells you it is safe. Push a food thermometer into the thickest part of the inner
          thigh, without touching the bone. When it reads <strong className="text-ink-soft">{SAFE_TEMP_F}°F</strong>, the turkey is
          done. If it is stuffed, check the center of the stuffing too: it also needs {SAFE_TEMP_F}°F. Pop-up timers and the
          color of the juices are not reliable on their own.
        </p>
        <p className="text-ink-faint text-sm leading-relaxed">
          Then let the turkey stand for about {REST_MIN} minutes before carving. The calculator above already includes that rest
          in the time it tells you to put the turkey in the oven, and it plans around the longest estimate so the bird is ready
          in time; if it reaches {SAFE_TEMP_F}°F early, tent it loosely with foil while you finish the sides.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">Planning a Thanksgiving turkey</h2>
        <ul className="space-y-2 text-sm text-ink-faint">
          <li className="flex gap-3"><span className="text-amber-700">•</span><span><strong className="text-ink-soft">Days before:</strong> thaw it in the refrigerator, about one day for every 4 to 5 pounds. A 15 lb turkey needs 3 to 4 days, so it should go in the fridge by the weekend before. <Link href="/cooking/turkey-thawing-time-calculator" className="text-blue-700 underline">Work out your thaw date</Link>.</span></li>
          <li className="flex gap-3"><span className="text-amber-700">•</span><span><strong className="text-ink-soft">The day:</strong> heat the oven to {OVEN_TEMP_F}°F, put the turkey in by the time shown above, and start checking the temperature at the low end of the range.</span></li>
          <li className="flex gap-3"><span className="text-amber-700">•</span><span><strong className="text-ink-soft">Oven space:</strong> a turkey occupies the oven for hours. Bake sides that need a different temperature while it rests, or adjust their times with the <Link href="/cooking/cooking-time-calculator" className="text-blue-700 underline">cooking time adjustment calculator</Link>.</span></li>
          <li className="flex gap-3"><span className="text-amber-700">•</span><span><strong className="text-ink-soft">Leftovers:</strong> refrigerate within 2 hours of cooking and reheat turkey, stuffing and gravy to {SAFE_TEMP_F}°F.</span></li>
        </ul>
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
          <a href={USDA_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">{USDA_SOURCE.label}</a>. Times are
          estimates for planning; always confirm doneness with a food thermometer.
        </p>
      </section>
    </>
  );
}
