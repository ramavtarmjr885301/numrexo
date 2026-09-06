// app/contact/page.tsx
//
// Server component. Exports the contact page metadata and renders the client form.
// Do NOT add "use client" here — metadata stops working the moment you do.

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact Numrexo: Support, Feedback and Requests",
  description:
    "Get in touch with the Numrexo team about a calculator that looks wrong, a tool you would like us to build, a partnership, or anything else. We reply within 24 to 48 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
