import { notFound } from "next/navigation";
import { CALCULATORS } from "@/data/calculators";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
  const taxCalcs = CALCULATORS.filter(c => c.category === "tax");
  return taxCalcs.map((calc) => ({
    slug: calc.slug,
  }));
}

export default function TaxCalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = CALCULATORS.find(
    (c) => c.slug === params.slug && c.category === "tax"
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}