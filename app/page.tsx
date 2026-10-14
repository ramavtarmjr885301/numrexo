// app/page.tsx
//
// Server component. Exports the homepage metadata and renders the client UI.
// Do NOT add "use client" here — metadata stops working the moment you do.

import type { Metadata } from "next";
import { buildMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import HomePageClient from "./HomePageClient";

const TOOL_COUNT = CALCULATORS_REGISTRY.length;

// The root layout's "%s | Numrexo" template does not apply to the homepage (same route
// segment as the layout), so the brand is written into this title by hand.
const homeMetadata = buildMetadata({
  title: "Free Online Calculators: Finance, Health & Math",
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

export const metadata: Metadata = {
  ...homeMetadata,
  title: { absolute: "Free Online Calculators: Finance, Health & Math | Numrexo" },
};

// Tells Google the site name and brand (shown in results and the knowledge panel).
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: "Free online calculators for finance, health, math, tax, conversions and more.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.jpg`, width: 320, height: 320 },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
