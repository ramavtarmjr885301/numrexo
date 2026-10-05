// app/page.tsx
//
// Server component. Exports the homepage metadata and renders the client UI.
// Do NOT add "use client" here — metadata stops working the moment you do.

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import HomePageClient from "./HomePageClient";

const TOOL_COUNT = CALCULATORS_REGISTRY.length;

export const metadata: Metadata = buildMetadata({
  title: "Free Online Calculators for Finance, Health and Math",
  description:
    `${TOOL_COUNT}+ free online calculators for mortgages and loans, BMI and fitness, taxes, grades and unit conversion. No sign-up, and nothing you enter leaves your browser.`,
  keywords: [
    "free online calculators",
    "calculator website",
    "mortgage calculator",
    "bmi calculator",
    "percentage calculator",
    "unit converter",
  ],
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
