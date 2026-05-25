import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
  const financeCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "finance");
  return financeCalcs.map((calc) => ({
    slug: calc.slug,
  }));
}

export default function FinanceCalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = CALCULATORS_REGISTRY.find(
    (c) => c.slug === params.slug && c.category === "finance"
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorWrapper calculator={calculator} />;
}




















// import { notFound } from "next/navigation";
// import { CALCULATORS } from "@/data/calculators";
// import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

// export async function generateStaticParams() {
//   const financeCalcs = CALCULATORS.filter(c => c.category === "finance");
//   return financeCalcs.map((calc) => ({
//     slug: calc.slug,
//   }));
// }

// export default function FinanceCalculatorPage({ params }: { params: { slug: string } }) {
//   const calculator = CALCULATORS.find(
//     (c) => c.slug === params.slug && c.category === "finance"
//   );

//   if (!calculator) {
//     notFound();
//   }

//   return <CalculatorWrapper calculator={calculator} />;
// }