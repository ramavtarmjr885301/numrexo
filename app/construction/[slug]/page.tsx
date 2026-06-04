import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const constructionCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "construction");
    return constructionCalcs.map((calc) => ({
        slug: calc.slug,
    }));
}

export default function ConstructionCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(
        (c) => c.slug === params.slug && c.category === "construction"
    );

    if (!calculator) {
        notFound();
    }

    return <CalculatorWrapper calculator={calculator} />;
}