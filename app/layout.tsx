import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Numrexo – Free Online Calculators",
  description: "Free online calculators for BMI, EMI, GST and more. Fast, accurate, mobile-friendly.",
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