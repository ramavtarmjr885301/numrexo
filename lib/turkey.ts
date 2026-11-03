// lib/turkey.ts
//
// Turkey roasting and thawing times, from the USDA Food Safety and Inspection
// Service "Let's Talk Turkey" guidance (as reproduced in the Minnesota
// Department of Health consumer fact sheet "Turkey: Safe Thawing and Cooking").
// The tables are estimates for a conventional oven at 325°F; doneness is always
// decided by a food thermometer reading 165°F.

export interface RoastBand {
  minLb: number;
  maxLb: number;
  /** Hours, low and high end of the USDA estimate. */
  minH: number;
  maxH: number;
  note?: string;
}

/** USDA roasting timetable at 325°F, unstuffed whole turkey. */
export const UNSTUFFED: RoastBand[] = [
  { minLb: 4, maxLb: 8, minH: 1.5, maxH: 3.25, note: "breast" },
  { minLb: 8, maxLb: 12, minH: 2.75, maxH: 3 },
  { minLb: 12, maxLb: 14, minH: 3, maxH: 3.75 },
  { minLb: 14, maxLb: 18, minH: 3.75, maxH: 4.25 },
  { minLb: 18, maxLb: 20, minH: 4.25, maxH: 4.5 },
  { minLb: 20, maxLb: 24, minH: 4.5, maxH: 5 },
];

/** USDA roasting timetable at 325°F, stuffed whole turkey. */
export const STUFFED: RoastBand[] = [
  { minLb: 6, maxLb: 8, minH: 2.5, maxH: 3.5, note: "breast" },
  { minLb: 8, maxLb: 12, minH: 3, maxH: 3.5 },
  { minLb: 12, maxLb: 14, minH: 3.5, maxH: 4 },
  { minLb: 14, maxLb: 18, minH: 4, maxH: 4.25 },
  { minLb: 18, maxLb: 20, minH: 4.25, maxH: 4.75 },
  { minLb: 20, maxLb: 24, minH: 4.75, maxH: 5.25 },
];

export const SAFE_TEMP_F = 165;
export const OVEN_TEMP_F = 325;
export const REST_MIN = 20;
export const KG_PER_LB = 0.45359237;

/** The band a weight falls into (a weight on a boundary uses the lower band). Null when outside the table. */
export function roastBand(weightLb: number, stuffed: boolean): RoastBand | null {
  const table = stuffed ? STUFFED : UNSTUFFED;
  if (weightLb < table[0].minLb || weightLb > table[table.length - 1].maxLb) return null;
  return table.find((b) => weightLb >= b.minLb && weightLb <= b.maxLb) ?? null;
}

/** USDA: refrigerator thawing takes about 24 hours for every 4 to 5 pounds. Returns days (low, high). */
export function fridgeThawDays(weightLb: number): { min: number; max: number } {
  return { min: weightLb / 5, max: weightLb / 4 };
}

/** USDA: cold-water thawing takes about 30 minutes per pound. Returns hours. */
export function coldWaterThawHours(weightLb: number): number {
  return weightLb * 0.5;
}

/** "3 hr 45 min" */
export function hoursLabel(h: number): string {
  const total = Math.round(h * 60);
  const hh = Math.floor(total / 60);
  const mm = total % 60;
  if (!hh) return `${mm} min`;
  return mm ? `${hh} hr ${mm} min` : `${hh} hr`;
}

/** "1¾" style hours for the printable chart. */
export function fractionHours(h: number): string {
  const whole = Math.floor(h);
  const frac = Math.round((h - whole) * 4);
  const map = ["", "¼", "½", "¾"];
  return `${whole || ""}${map[frac] ?? ""}` || "0";
}

/** Thanksgiving in the US is the fourth Thursday of November. Returns y-m-d for the next one on or after `from`. */
export function nextThanksgiving(from: Date): string {
  for (let y = from.getFullYear(); y <= from.getFullYear() + 1; y++) {
    const nov1 = new Date(y, 10, 1);
    const firstThu = 1 + ((4 - nov1.getDay() + 7) % 7);
    const day = firstThu + 21;
    const d = new Date(y, 10, day, 23, 59);
    if (d >= from) return `${y}-11-${String(day).padStart(2, "0")}`;
  }
  return `${from.getFullYear() + 1}-11-26`;
}

export const USDA_SOURCE = {
  label: "USDA Food Safety and Inspection Service, “Let's Talk Turkey” (via Minnesota Department of Health fact sheet)",
  url: "https://health.state.mn.us/people/foodsafety/foods/turkey.pdf",
};
