// app/[category]/[slug]/page.tsx
import { notFound } from "next/navigation";
// import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";
import { CALCULATORS_REGISTRY, getPopularCalculators } from "@/data/calculatorsRegistry";


// Generate static paths for all calculators at build time
const popularCalculators = getPopularCalculators(6);

export async function generateStaticParams() {
  return CALCULATORS_REGISTRY.map((calc) => ({
    category: calc.category,
    slug: calc.slug,
  }));
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  
  const calculator = CALCULATORS_REGISTRY.find(
    (c) => c.category === category && c.slug === slug
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}