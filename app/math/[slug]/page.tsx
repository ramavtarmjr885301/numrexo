import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
  const mathCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "math");
  return mathCalcs.map((calc) => ({
    slug: calc.slug,
  }));
}

export default function MathCalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = CALCULATORS_REGISTRY.find(
    (c) => c.slug === params.slug && c.category === "math"
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}