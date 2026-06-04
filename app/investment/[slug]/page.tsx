import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const investmentCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "investment");
    return investmentCalcs.map((calc) => ({ slug: calc.slug }));
}

export default function InvestmentCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(c => c.slug === params.slug && c.category === "investment");
    if (!calculator) notFound();
    return <CalculatorWrapper calculator={calculator} />;
}