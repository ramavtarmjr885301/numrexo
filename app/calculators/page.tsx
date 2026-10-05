import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorsClient from "./CalculatorsClient";

export const metadata: Metadata = buildMetadata({
  title: "All Calculators: Browse Every Numrexo Tool",
  description:
    "Browse and search every Numrexo calculator across finance, health, math, tax, education, construction, cooking and travel. Free, instant, no sign-up.",
  path: "/calculators",
});


export default async function CalculatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;

  return (
    <CalculatorsClient
      initialSearch={params.search || ""}
    />
  );
}