import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
  const healthCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "health");
  return healthCalcs.map((calc) => ({
    slug: calc.slug,
  }));
}

export default function HealthCalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = CALCULATORS_REGISTRY.find(
    (c) => c.slug === params.slug && c.category === "health"
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}



























// import { notFound } from "next/navigation";
// import { CALCULATORS, CalculatorType } from "@/data/calculators";
// import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

// export async function generateStaticParams() {
//   const healthCalcs = CALCULATORS.filter(c => c.category === "health");
//   return healthCalcs.map((calc) => ({
//     slug: calc.slug,
//   }));
// }

// export default function HealthCalculatorPage({ params }: { params: { slug: string } }) {
//   const calculator = CALCULATORS.find(
//     (c) => c.slug === params.slug && c.category === "health"
//   );

//   if (!calculator) {
//     notFound();
//   }

//   return <CalculatorWrapper calculator={calculator} />;
// }