import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

// Site-wide defaults ONLY.
//
// `title.template` appends " | Numrexo" to whatever a page exports as a string
// title, so pages set just their own part. `title.default` is the fallback for
// a page that exports no title at all — it should be rare, and it is no longer
// what 138 URLs ship, which was the single biggest SEO problem on this site.
//
// `metadataBase` is what makes relative canonical and Open Graph URLs resolve to
// absolute ones. Without it Next.js warns at build time and emits relative URLs.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Numrexo: Free Online Calculators for Everyday Numbers",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Over 100 free online calculators for loans, health, tax, math, grades and unit conversion. No sign-up, and nothing you enter leaves your browser.",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", site: "@numrexo" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${jetbrainsMono.variable} font-sans bg-[#0a0e1a] text-[#e2e8f0] antialiased`}
        suppressHydrationWarning
      >
        {/* Google Analytics - Fixed preload warning */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `,
          }}
        />
        <Script
  async
  strategy="afterInteractive"
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2722324525359517"
  crossOrigin="anonymous"
/>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}