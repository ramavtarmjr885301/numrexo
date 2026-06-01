import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const educationCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "education");
    return educationCalcs.map((calc) => ({ slug: calc.slug }));
}

export default function EducationCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(c => c.slug === params.slug && c.category === "education");
    if (!calculator) notFound();
    return <CalculatorWrapper calculator={calculator} />;
}