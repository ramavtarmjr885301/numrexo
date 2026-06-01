import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const travelCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "travel");
    return travelCalcs.map((calc) => ({ slug: calc.slug }));
}

export default function TravelCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(c => c.slug === params.slug && c.category === "travel");
    if (!calculator) notFound();
    return <CalculatorWrapper calculator={calculator} />;
}