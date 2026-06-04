import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import CalculatorWrapper from "@/components/calculators/CalculatorWrapper";

export async function generateStaticParams() {
    const cookingCalcs = CALCULATORS_REGISTRY.filter(c => c.category === "cooking");
    return cookingCalcs.map((calc) => ({
        slug: calc.slug,
    }));
}

export default function CookingCalculatorPage({ params }: { params: { slug: string } }) {
    const calculator = CALCULATORS_REGISTRY.find(
        (c) => c.slug === params.slug && c.category === "cooking"
    );

    if (!calculator) {
        notFound();
    }

    return <CalculatorWrapper calculator={calculator} />;
}