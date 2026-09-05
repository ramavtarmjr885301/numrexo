// app/cooking/page.tsx
//
// Server component. Its only job is to export real metadata (title, description,
// canonical, Open Graph, Twitter) and render the client UI.
// Do NOT add "use client" here — metadata stops working the moment you do.

import type { Metadata } from "next";
import { categoryMetadata } from "@/lib/seo";
import CookingCategoryClient from "./CookingCategoryClient";

export const metadata: Metadata = categoryMetadata("cooking");

export default function CookingCategoryPage() {
  return <CookingCategoryClient />;
}
