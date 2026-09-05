// app/investment/page.tsx
//
// Server component. Its only job is to export real metadata (title, description,
// canonical, Open Graph, Twitter) and render the client UI.
// Do NOT add "use client" here — metadata stops working the moment you do.

import type { Metadata } from "next";
import { categoryMetadata } from "@/lib/seo";
import InvestmentCategoryClient from "./InvestmentCategoryClient";

export const metadata: Metadata = categoryMetadata("investment");

export default function InvestmentCategoryPage() {
  return <InvestmentCategoryClient />;
}
