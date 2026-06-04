import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
  return CALCULATORS_REGISTRY.map((calc) => ({
    slug: calc.slug,
  }));
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = CALCULATORS_REGISTRY.find(
    (c) => c.slug === params.slug
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}
