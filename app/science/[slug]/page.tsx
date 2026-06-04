import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const scienceCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "science");
    return scienceCalcs.map((calc) => ({
        slug: calc.slug,
    }));
}

export default function ScienceCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(
        (c) => c.slug === params.slug && c.category === "science"
    );

    if (!calculator) {
        notFound();
    }

    return <CalculatorWrapper calculator={calculator} />;
}