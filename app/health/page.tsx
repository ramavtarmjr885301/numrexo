// app/health/page.tsx
//
// Server component. Its only job is to export real metadata (title, description,
// canonical, Open Graph, Twitter) and render the client UI.
// Do NOT add "use client" here — metadata stops working the moment you do.

import type { Metadata } from "next";
import { categoryMetadata } from "@/lib/seo";
import HealthCategoryClient from "./HealthCategoryClient";

export const metadata: Metadata = categoryMetadata("health");

export default function HealthCategoryPage() {
  return <HealthCategoryClient />;
}
