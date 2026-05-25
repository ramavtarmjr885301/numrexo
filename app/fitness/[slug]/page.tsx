import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
  const fitnessCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "fitness");
  return fitnessCalcs.map((calc) => ({
    slug: calc.slug,
  }));
}

export default function FitnessCalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = CALCULATORS_REGISTRY.find(
    (c) => c.slug === params.slug && c.category === "fitness"
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}