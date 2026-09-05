// lib/calculatorRoute.tsx
//
// Every /<category>/[slug] route was its own near-identical file with no
// metadata at all, which is how 117 calculator pages ended up sharing one
// <title>. This factory builds the three exports a category route needs, so
// adding metadata to one place covers all of them and they cannot drift apart.
//
// Usage in app/finance/[slug]/page.tsx:
//
//   import { createCalculatorRoute } from "@/lib/calculatorRoute";
//   const route = createCalculatorRoute("finance");
//   export const generateStaticParams = route.generateStaticParams;
//   export const generateMetadata = route.generateMetadata;
//   export default route.Page;
//
// This file must stay a SERVER module (no "use client"). CalculatorWrapper is
// a client component and is rendered from here, which is allowed.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY, type CalculatorType } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";
import { calculatorMetadata } from "@/lib/seo";

type Category = CalculatorType["category"];

interface RouteParams {
  params: { slug: string };
}

export function createCalculatorRoute(category: Category) {
  const calculatorsInCategory = () =>
    CALCULATORS_REGISTRY.filter((c) => c.category === category);

  const find = (slug: string) =>
    CALCULATORS_REGISTRY.find((c) => c.category === category && c.slug === slug);

  async function generateStaticParams() {
    return calculatorsInCategory().map((calc) => ({ slug: calc.slug }));
  }

  async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
    const calculator = find(params.slug);

    if (!calculator) {
      // A 404 should never be indexed, and it must not inherit a real title.
      return {
        title: "Calculator Not Found",
        description: "The calculator you are looking for does not exist or has moved.",
        robots: { index: false, follow: true },
      };
    }

    return calculatorMetadata(calculator);
  }

  function Page({ params }: RouteParams) {
    const calculator = find(params.slug);

    if (!calculator) {
      notFound();
    }

    // NOTE: BreadcrumbList / FAQPage / WebApplication JSON-LD is already emitted
    // by the individual calculator components. Do not add another BreadcrumbList
    // here or every page ends up with two, which Google treats as a conflict.
    return <CalculatorWrapper calculator={calculator} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
