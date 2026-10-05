// lib/shareHeadline.ts
//
// The celebratory line printed on the shareable result card. People post a
// result when it makes them feel good, so every BMI category gets a headline
// that is positive and about the person's next step, never about a "problem".
// Someone in the healthy range gets to celebrate; someone above it gets a
// "Day 1" / "transformation" line that is just as proud to post; someone below
// it gets a "building strength" line. Nobody is told they are fat or thin.
//
// Plain TypeScript (no React, no DOM) so it is easy to test.

export interface HeadlineRow {
  label: string;
  value: string;
}

interface BmiMessage {
  headline: string;
  /** Short, upbeat sentence reused in the text that goes with the shared picture. */
  caption: string;
}

function bmiMessage(category: string): BmiMessage {
  const c = category.trim().toLowerCase();
  if (c.includes("normal") || c.includes("healthy")) {
    return { headline: "I'm in the healthy weight range! 🎉", caption: "I'm in the healthy weight range! 🎉" };
  }
  if (c.includes("thin") || c.includes("under")) {
    return { headline: "Building strength, one day at a time 💪", caption: "I'm building strength, one day at a time 💪" };
  }
  if (c.includes("over")) {
    return { headline: "Day 1 of my fitness journey 🚀", caption: "Day 1 of my fitness journey 🚀" };
  }
  if (c.includes("obese")) {
    return { headline: "Day 1 of my transformation 🔥", caption: "Day 1 of my transformation 🔥" };
  }
  return { headline: "I checked my BMI today 👏", caption: "I checked my BMI today 👏" };
}

/**
 * Returns the headline for a calculator's result, or undefined when there is
 * no special message for it (the card then looks exactly as before).
 */
export function shareHeadlineFor(
  calcSlug: string | undefined,
  rows: HeadlineRow[],
): { headline: string; caption: string } | undefined {
  if (calcSlug === "bmi-calculator") {
    const cat = rows.find((r) => /category/i.test(r.label))?.value;
    if (cat) return bmiMessage(cat);
  }
  return undefined;
}

/** "Your BMI" -> "My BMI": the picture is posted by the person it belongs to. */
export function toFirstPerson(label: string): string {
  return label.replace(/^\s*your\b/i, (m) => (m.trim()[0] === "Y" ? "My" : "my"));
}
