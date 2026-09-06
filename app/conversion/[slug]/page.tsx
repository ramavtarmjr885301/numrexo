// app/conversion/[slug]/page.tsx
//
// Metadata, static params and rendering all come from one shared factory so
// every calculator page gets a unique title, description and canonical URL.
// See lib/calculatorRoute.tsx.

import { createCalculatorRoute } from "@/lib/calculatorRoute";

const route = createCalculatorRoute("conversion");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
