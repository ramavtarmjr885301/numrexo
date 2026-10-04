import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorsClient from "./CalculatorsClient";

export const metadata: Metadata = buildMetadata({
  title: "All Calculators: Browse Every Numrexo Tool",
  description:
    "Browse and search every calculator on Numrexo across finance, health, math, tax, education, construction, cooking and travel. Free, instant, and no sign-up needed.",
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