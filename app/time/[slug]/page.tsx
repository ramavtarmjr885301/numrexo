import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const timeCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "time");
    return timeCalcs.map((calc) => ({ slug: calc.slug }));
}

export default function TimeCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(c => c.slug === params.slug && c.category === "time");
    if (!calculator) notFound();
    return <CalculatorWrapper calculator={calculator} />;
}