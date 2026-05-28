// import { Metadata } from "next";

// // ─── METADATA (Next.js 13+ App Router) ──────────────────────
// export const metadata: Metadata = {
//     title: "About Numrexo | Free Online Calculator Platform for Everyone",
//     description:
//         "Learn about Numrexo — a free online calculator platform with 1000+ tools for health, finance, math, business, and more. No login needed. Fast, accurate, and privacy-first.",
//     keywords: [
//         "about numrexo",
//         "free online calculator platform",
//         "online calculator tools",
//         "BMI calculator",
//         "EMI calculator",
//         "GST calculator",
//         "calculator website",
//         "Sanjay Singh numrexo",
//     ],
//     alternates: {
//         canonical: "https://www.numrexo.com/about",
//     },
//     openGraph: {
//         type: "website",
//         url: "https://www.numrexo.com/about",
//         title: "About Numrexo | Free Online Calculator Platform for Everyone",
//         description:
//             "Numrexo offers 1000+ free online calculators for health, finance, math, and more. No login, no fees. Fast, accurate, and privacy-first.",
//         siteName: "Numrexo",
//         images: [
//             {
//                 url: "https://www.numrexo.com/og-about.png",
//                 width: 1200,
//                 height: 630,
//                 alt: "Numrexo — Free Online Calculator Platform",
//             },
//         ],
//     },
//     twitter: {
//         card: "summary_large_image",
//         title: "About Numrexo | Free Online Calculator Platform for Everyone",
//         description:
//             "1000+ free calculators for health, finance, math, and more. No login needed.",
//         images: ["https://www.numrexo.com/og-about.png"],
//     },
//     robots: {
//         index: true,
//         follow: true,
//         googleBot: { index: true, follow: true },
//     },
// };

// // ─── SCHEMA DATA ─────────────────────────────────────────────
// const organizationSchema = {
//     "@context": "https://schema.org",
//     "@graph": [
//         {
//             "@type": "Organization",
//             "@id": "https://www.numrexo.com/#organization",
//             name: "Numrexo",
//             url: "https://www.numrexo.com",
//             logo: {
//                 "@type": "ImageObject",
//                 url: "https://www.numrexo.com/logo.png",
//                 width: 200,
//                 height: 60,
//             },
//             description:
//                 "Numrexo is a free online calculator platform offering 1000+ calculators for health, finance, math, business, fitness, education, and real estate — designed for students, professionals, and everyday users worldwide.",
//             foundingDate: "2026",
//             founder: {
//                 "@type": "Person",
//                 "@id": "https://www.numrexo.com/about#sanjay-singh",
//                 name: "Sanjay Singh",
//                 jobTitle: "Founder & Entrepreneur",
//             },
//             knowsAbout: [
//                 "Online Calculators",
//                 "BMI Calculator",
//                 "EMI Calculator",
//                 "GST Calculator",
//                 "Financial Tools",
//                 "Health Calculators",
//                 "Math Tools",
//             ],
//             offers: {
//                 "@type": "Offer",
//                 price: "0",
//                 priceCurrency: "USD",
//                 description:
//                     "All calculators are completely free. No login or signup required.",
//             },
//             areaServed: "Worldwide",
//             sameAs: [
//                 "https://twitter.com/numrexo",
//                 "https://www.linkedin.com/company/numrexo",
//                 "https://www.facebook.com/numrexo",
//             ],
//         },
//         {
//             "@type": "Person",
//             "@id": "https://www.numrexo.com/about#sanjay-singh",
//             name: "Sanjay Singh",
//             jobTitle: "Founder",
//             description:
//                 "Sanjay Singh is an entrepreneur focused on building practical digital tools that simplify everyday tasks and make information accessible through technology.",
//             worksFor: { "@id": "https://www.numrexo.com/#organization" },
//             url: "https://www.numrexo.com/about",
//         },
//         {
//             "@type": "WebPage",
//             "@id": "https://www.numrexo.com/about#webpage",
//             url: "https://www.numrexo.com/about",
//             name: "About Numrexo | Free Online Calculator Platform for Everyone",
//             description:
//                 "Learn about Numrexo, a free online calculator platform with 1000+ tools for health, finance, math, and more.",
//             isPartOf: { "@id": "https://www.numrexo.com/#website" },
//             about: { "@id": "https://www.numrexo.com/#organization" },
//             breadcrumb: {
//                 "@type": "BreadcrumbList",
//                 itemListElement: [
//                     {
//                         "@type": "ListItem",
//                         position: 1,
//                         name: "Home",
//                         item: "https://www.numrexo.com",
//                     },
//                     {
//                         "@type": "ListItem",
//                         position: 2,
//                         name: "About",
//                         item: "https://www.numrexo.com/about",
//                     },
//                 ],
//             },
//         },
//         {
//             "@type": "WebSite",
//             "@id": "https://www.numrexo.com/#website",
//             url: "https://www.numrexo.com",
//             name: "Numrexo",
//             description:
//                 "Free online calculators for health, finance, math, business, and everyday use.",
//             publisher: { "@id": "https://www.numrexo.com/#organization" },
//         },
//     ],
// };

// // ─── CALCULATOR CATEGORIES ───────────────────────────────────
// const categories = [
//     { name: "Health Calculators", href: "/calculators/health", icon: "🩺", desc: "BMI, body fat, calorie needs" },
//     { name: "Finance Calculators", href: "/calculators/finance", icon: "💰", desc: "EMI, SIP, compound interest" },
//     { name: "Tax Calculators", href: "/calculators/tax", icon: "🧾", desc: "GST, income tax, VAT" },
//     { name: "Math Calculators", href: "/calculators/math", icon: "📐", desc: "Percentage, average, algebra" },
//     { name: "Business Calculators", href: "/calculators/business", icon: "📊", desc: "Profit margin, ROI, break-even" },
//     { name: "Fitness Calculators", href: "/calculators/fitness", icon: "🏋️", desc: "VO2 max, macros, pace" },
//     { name: "Education Calculators", href: "/calculators/education", icon: "🎓", desc: "GPA, CGPA, grade point" },
//     { name: "Real Estate Calculators", href: "/calculators/real-estate", icon: "🏠", desc: "Home loan, stamp duty, rent" },
// ];

// // ─── WHY NUMREXO FEATURES ─────────────────────────────────────
// const features = [
//     { icon: "⚡", title: "Instant Results", desc: "Every calculation happens in milliseconds — no loading, no waiting." },
//     { icon: "🔒", title: "Privacy First", desc: "All calculations run directly in your browser. No data is sent to our servers." },
//     { icon: "🆓", title: "Always Free", desc: "Every tool on Numrexo is completely free. No hidden fees, no subscriptions." },
//     { icon: "📱", title: "Works Everywhere", desc: "Optimized for mobile, tablet, and desktop — any device, any screen." },
//     { icon: "🔑", title: "No Login Required", desc: "Just open and use. No account creation or sign-up of any kind." },
//     { icon: "🎯", title: "Accurate & Reliable", desc: "Built with precision-tested formulas trusted by professionals globally." },
// ];

// export default function AboutPage() {
//     return (
//         <>
//             {/* JSON-LD Schema — Global SEO ke liye critical */}
//             <script
//                 type="application/ld+json"
//                 dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
//             />

//             <div className="px-6 py-12 md:py-16">
//                 <div className="max-w-4xl mx-auto">
//                     {/* ── Breadcrumb (visible + SEO) ─────────────────── */}
//                     <nav aria-label="Breadcrumb" className="mb-8">
//                         <ol className="flex items-center gap-2 text-sm text-gray-500">
//                             <li>
//                                 <a href="/" className="hover:text-white transition-colors">Home</a>
//                             </li>
//                             <li aria-hidden="true" className="text-gray-700">/</li>
//                             <li className="text-gray-300" aria-current="page">About</li>
//                         </ol>
//                     </nav>

//                     {/* ── H1 — Page Title ────────────────────────────── */}
//                     <h1 className="text-3xl md:text-4xl font-bold mb-3">
//                         About Numrexo
//                     </h1>
//                     <p className="text-gray-400 text-lg mb-10 leading-relaxed">
//                         A free online calculator platform built for students, professionals,
//                         and everyday users — making accurate calculations simple and
//                         accessible for everyone, everywhere.
//                     </p>

//                     {/* ── SECTION 1: Mission ─────────────────────────── */}
//                     <section className="mb-10">
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
//                             <h2 className="text-xl font-semibold text-white mb-4">
//                                 Our Mission
//                             </h2>
//                             <p className="text-gray-300 leading-relaxed mb-4">
//                                 We built Numrexo with a single goal — to remove complexity from
//                                 everyday calculations. Most calculator websites feel outdated,
//                                 overloaded, or difficult to navigate. Numrexo focuses on
//                                 <strong className="text-white"> speed, accuracy, mobile-friendly design,</strong> and
//                                 user simplicity — without ads, distractions, or complicated
//                                 interfaces.
//                             </p>
//                             <p className="text-gray-300 leading-relaxed">
//                                 Whether you are a student solving math problems, a professional
//                                 managing financial decisions, or someone tracking personal health
//                                 and fitness goals — Numrexo gives you accurate results instantly
//                                 with a clean, distraction-free experience.
//                             </p>
//                         </div>
//                     </section>

//                     {/* ── SECTION 2: Calculator Categories (Internal Links) ── */}
//                     <section className="mb-10">
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
//                             <h2 className="text-xl font-semibold text-white mb-2">
//                                 What We Offer
//                             </h2>
//                             <p className="text-gray-400 text-sm mb-6">
//                                 Numrexo covers 8 major categories with 100+ calculators and
//                                 growing.
//                             </p>
//                             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                 {categories.map((cat) => (
//                                     <li key={cat.name}>
//                                         <a
//                                             href={cat.href}
//                                             className="flex items-start gap-3 p-3 rounded-lg border border-gray-800 hover:border-gray-600 hover:bg-gray-800/40 transition-all group"
//                                         >
//                                             <span className="text-xl mt-0.5" aria-hidden="true">
//                                                 {cat.icon}
//                                             </span>
//                                             <span>
//                                                 <span className="block text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
//                                                     {cat.name}
//                                                 </span>
//                                                 <span className="block text-xs text-gray-500 mt-0.5">
//                                                     {cat.desc}
//                                                 </span>
//                                             </span>
//                                         </a>
//                                     </li>
//                                 ))}
//                             </ul>
//                             <div className="mt-5">
//                                 <a
//                                     href="/calculators"
//                                     className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
//                                 >
//                                     Browse all calculators
//                                     <span aria-hidden="true">→</span>
//                                 </a>
//                             </div>
//                         </div>
//                     </section>

//                     {/* ── SECTION 3: Why Numrexo (E-E-A-T + UX) ────── */}
//                     <section className="mb-10">
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
//                             <h2 className="text-xl font-semibold text-white mb-6">
//                                 Why Millions Choose Numrexo
//                             </h2>
//                             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                                 {features.map((f) => (
//                                     <li key={f.title} className="flex items-start gap-3">
//                                         <span className="text-2xl mt-0.5" aria-hidden="true">
//                                             {f.icon}
//                                         </span>
//                                         <span>
//                                             <span className="block text-sm font-semibold text-white mb-1">
//                                                 {f.title}
//                                             </span>
//                                             <span className="block text-sm text-gray-400 leading-relaxed">
//                                                 {f.desc}
//                                             </span>
//                                         </span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </section>

//                     {/* ── SECTION 4: Vision ──────────────────────────── */}
//                     <section className="mb-10">
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
//                             <h2 className="text-xl font-semibold text-white mb-4">
//                                 Our Vision
//                             </h2>
//                             <p className="text-gray-300 leading-relaxed mb-4">
//                                 Our long-term vision is to build one of the world's largest and
//                                 most trusted free online calculator platforms — with{" "}
//                                 <strong className="text-white">1,000+ calculators</strong> covering
//                                 real-world needs for students, professionals, businesses, and
//                                 everyday users globally.
//                             </p>
//                             <p className="text-gray-300 leading-relaxed">
//                                 We continuously improve our tools, user experience, and platform
//                                 performance to deliver fast, accurate, and reliable calculations
//                                 that users can trust — anytime, on any device, in any country.
//                             </p>
//                         </div>
//                     </section>

//                     {/* ── SECTION 5: Founder (E-E-A-T — very important) ── */}
//                     <section className="mb-10">
//                         <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8">
//                             <h2 className="text-xl font-semibold text-white mb-6">
//                                 Meet the Founder
//                             </h2>
//                             <div className="flex items-start gap-5">
//                                 {/* Placeholder — jab tak photo upload nahi karte */}
//                                 <div
//                                     className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
//                                     aria-hidden="true"
//                                 >
//                                     SS
//                                 </div>

//                                 <div>
//                                     <p className="text-white font-semibold text-base mb-0.5">
//                                         Sanjay Singh
//                                     </p>
//                                     <p className="text-gray-500 text-sm mb-3">
//                                         Founder & Entrepreneur
//                                     </p>
//                                     <p className="text-gray-300 text-sm leading-relaxed">
//                                         Sanjay Singh is an energetic entrepreneur focused on
//                                         building practical digital tools that simplify everyday
//                                         tasks. With Numrexo, his mission is to make accurate
//                                         calculations accessible to everyone — students, working
//                                         professionals, and businesses — without cost or complexity.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     {/* ── CTA — Internal Link (UX + SEO link equity) ── */}
//                     <section className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-900/40 rounded-xl p-6 md:p-8 text-center">
//                         <h2 className="text-xl font-semibold text-white mb-2">
//                             Start Calculating — It's Free
//                         </h2>
//                         <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
//                             No account needed. Pick any calculator and get your answer in
//                             seconds.
//                         </p>
//                         <a
//                             href="/calculators"
//                             className="inline-block bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
//                         >
//                             Explore All Calculators →
//                         </a>
//                     </section>
//                 </div>
//             </div>
//         </>
//     );
// }



import { Metadata } from "next";

// ─── METADATA (Next.js 13+ App Router) ──────────────────────
export const metadata: Metadata = {
    title: "About Numrexo | Free Online Calculator Platform for Everyone",
    description:
        "Learn about Numrexo — a free online calculator platform with 1000+ tools for health, finance, math, business, and more. No login needed. Fast, accurate, and privacy-first.",
    keywords: [
        "about numrexo",
        "free online calculator platform",
        "online calculator tools",
        "BMI calculator",
        "EMI calculator",
        "GST calculator",
        "calculator website",
        "Sanjay Singh numrexo",
    ],
    alternates: {
        canonical: "https://www.numrexo.com/about",
    },
    openGraph: {
        type: "website",
        url: "https://www.numrexo.com/about",
        title: "About Numrexo | Free Online Calculator Platform for Everyone",
        description:
            "Numrexo offers 1000+ free online calculators for health, finance, math, and more. No login, no fees. Fast, accurate, and privacy-first.",
        siteName: "Numrexo",
        images: [
            {
                url: "https://www.numrexo.com/og-about.png",
                width: 1200,
                height: 630,
                alt: "Numrexo — Free Online Calculator Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Numrexo | Free Online Calculator Platform for Everyone",
        description:
            "1000+ free calculators for health, finance, math, and more. No login needed.",
        images: ["https://www.numrexo.com/og-about.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
};

// ─── SCHEMA DATA ─────────────────────────────────────────────
const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.numrexo.com/#organization",
            name: "Numrexo",
            url: "https://www.numrexo.com",
            logo: {
                "@type": "ImageObject",
                url: "https://www.numrexo.com/logo.png",
                width: 200,
                height: 60,
            },
            description:
                "Numrexo is a free online calculator platform offering 1000+ calculators for health, finance, math, business, fitness, education, and real estate — designed for students, professionals, and everyday users worldwide.",
            foundingDate: "2026",
            founder: {
                "@type": "Person",
                "@id": "https://www.numrexo.com/about#sanjay-singh",
                name: "Sanjay Singh",
                jobTitle: "Founder & Entrepreneur",
            },
            knowsAbout: [
                "Online Calculators",
                "BMI Calculator",
                "EMI Calculator",
                "GST Calculator",
                "Financial Tools",
                "Health Calculators",
                "Math Tools",
            ],
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description:
                    "All calculators are completely free. No login or signup required.",
            },
            areaServed: "Worldwide",
            sameAs: [
                "https://twitter.com/numrexo",
                "https://www.linkedin.com/company/numrexo",
                "https://www.facebook.com/numrexo",
            ],
        },
        {
            "@type": "Person",
            "@id": "https://www.numrexo.com/about#sanjay-singh",
            name: "Mr. Singh",
            jobTitle: "Founder",
            description:
                "Sanjay Singh is an entrepreneur focused on building practical digital tools that simplify everyday tasks and make information accessible through technology.",
            worksFor: { "@id": "https://www.numrexo.com/#organization" },
            url: "https://www.numrexo.com/about",
        },
        {
            "@type": "WebPage",
            "@id": "https://www.numrexo.com/about#webpage",
            url: "https://www.numrexo.com/about",
            name: "About Numrexo | Free Online Calculator Platform for Everyone",
            description:
                "Learn about Numrexo, a free online calculator platform with 1000+ tools for health, finance, math, and more.",
            isPartOf: { "@id": "https://www.numrexo.com/#website" },
            about: { "@id": "https://www.numrexo.com/#organization" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://www.numrexo.com",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "About",
                        item: "https://www.numrexo.com/about",
                    },
                ],
            },
        },
        {
            "@type": "WebSite",
            "@id": "https://www.numrexo.com/#website",
            url: "https://www.numrexo.com",
            name: "Numrexo",
            description:
                "Free online calculators for health, finance, math, business, and everyday use.",
            publisher: { "@id": "https://www.numrexo.com/#organization" },
        },
    ],
};

// ─── CALCULATOR CATEGORIES ───────────────────────────────────
const categories = [
    { name: "Health Calculators", href: "/calculators/health", icon: "🩺", desc: "BMI, body fat, calorie needs" },
    { name: "Finance Calculators", href: "/calculators/finance", icon: "💰", desc: "EMI, SIP, compound interest" },
    { name: "Tax Calculators", href: "/calculators/tax", icon: "🧾", desc: "GST, income tax, VAT" },
    { name: "Math Calculators", href: "/calculators/math", icon: "📐", desc: "Percentage, average, algebra" },
    { name: "Business Calculators", href: "/calculators/business", icon: "📊", desc: "Profit margin, ROI, break-even" },
    { name: "Fitness Calculators", href: "/calculators/fitness", icon: "🏋️", desc: "VO2 max, macros, pace" },
    { name: "Education Calculators", href: "/calculators/education", icon: "🎓", desc: "GPA, CGPA, grade point" },
    { name: "Real Estate Calculators", href: "/calculators/real-estate", icon: "🏠", desc: "Home loan, stamp duty, rent" },
];

// ─── WHY NUMREXO FEATURES ─────────────────────────────────────
const features = [
    { icon: "⚡", title: "Instant Results", desc: "Every calculation happens in milliseconds — no loading, no waiting." },
    { icon: "🔒", title: "Privacy First", desc: "All calculations run directly in your browser. No data is sent to our servers." },
    { icon: "🆓", title: "Always Free", desc: "Every tool on Numrexo is completely free. No hidden fees, no subscriptions." },
    { icon: "📱", title: "Works Everywhere", desc: "Optimized for mobile, tablet, and desktop — any device, any screen." },
    { icon: "🔑", title: "No Login Required", desc: "Just open and use. No account creation or sign-up of any kind." },
    { icon: "🎯", title: "Accurate & Reliable", desc: "Built with precision-tested formulas trusted by professionals globally." },
];

export default function AboutPage() {
    return (
        <>
            {/* JSON-LD Schema — Global SEO ke liye critical */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <div className="px-6 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    {/* ── Breadcrumb (visible + SEO) ─────────────────── */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-sm text-gray-500">
                            <li>
                                <a href="/" className="hover:text-white transition-colors">Home</a>
                            </li>
                            <li aria-hidden="true" className="text-gray-700">/</li>
                            <li className="text-gray-300" aria-current="page">About</li>
                        </ol>
                    </nav>

                    {/* ── H1 — Page Title ────────────────────────────── */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        About Numrexo
                    </h1>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-4xl">
                        A free online calculator platform built for students, professionals,
                        and everyday users — making accurate calculations simple and
                        accessible for everyone, everywhere.
                    </p>

                    {/* ── SECTION 1: Mission ─────────────────────────── */}
                    <section className="mb-10">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10">
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We built Numrexo with a single goal — to remove complexity from
                                everyday calculations. Most calculator websites feel outdated,
                                overloaded, or difficult to navigate. Numrexo focuses on
                                <strong className="text-white"> speed, accuracy, mobile-friendly design,</strong> and
                                user simplicity — without ads, distractions, or complicated
                                interfaces.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Whether you are a student solving math problems, a professional
                                managing financial decisions, or someone tracking personal health
                                and fitness goals — Numrexo gives you accurate results instantly
                                with a clean, distraction-free experience.
                            </p>
                        </div>
                    </section>

                    {/* ── SECTION 2: Calculator Categories (Internal Links) ── */}
                    <section className="mb-10">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10">
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                What We Offer
                            </h2>
                            <p className="text-gray-400 text-sm mb-6">
                                Numrexo covers 8 major categories with 100+ calculators and
                                growing.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {categories.map((cat) => (
                                    <li key={cat.name}>
                                        <a
                                            href={cat.href}
                                            className="flex items-start gap-3 p-3 rounded-lg border border-gray-800 hover:border-gray-600 hover:bg-gray-800/40 transition-all group"
                                        >
                                            <span className="text-xl mt-0.5" aria-hidden="true">
                                                {cat.icon}
                                            </span>
                                            <span>
                                                <span className="block text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                                    {cat.name}
                                                </span>
                                                <span className="block text-xs text-gray-500 mt-0.5">
                                                    {cat.desc}
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5">
                                <a
                                    href="/calculators"
                                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Browse all calculators
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 3: Why Numrexo (E-E-A-T + UX) ────── */}
                    <section className="mb-10">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10">
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                                Why Millions Choose Numrexo
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {features.map((f) => (
                                    <li key={f.title} className="flex items-start gap-3">
                                        <span className="text-2xl mt-0.5" aria-hidden="true">
                                            {f.icon}
                                        </span>
                                        <span>
                                            <span className="block text-sm font-semibold text-white mb-1">
                                                {f.title}
                                            </span>
                                            <span className="block text-sm text-gray-400 leading-relaxed">
                                                {f.desc}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* ── SECTION 4: Vision ──────────────────────────── */}
                    <section className="mb-10">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10">
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Our long-term vision is to build one of the world's largest and
                                most trusted free online calculator platforms — with{" "}
                                <strong className="text-white">1,000+ calculators</strong> covering
                                real-world needs for students, professionals, businesses, and
                                everyday users globally.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                We continuously improve our tools, user experience, and platform
                                performance to deliver fast, accurate, and reliable calculations
                                that users can trust — anytime, on any device, in any country.
                            </p>
                        </div>
                    </section>

                    {/* ── SECTION 5: Founder (E-E-A-T — very important) ── */}
                    <section className="mb-10">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10">
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                                Meet the Founder
                            </h2>
                            <div className="flex items-start gap-5">
                                {/* Placeholder — jab tak photo upload nahi karte */}
                                <div
                                    className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                                    aria-hidden="true"
                                >
                                    SS
                                </div>

                                <div>
                                    <p className="text-white font-semibold text-base mb-0.5">
                                        Mr. Singh
                                    </p>
                                    <p className="text-gray-500 text-sm mb-3">
                                        Founder & Entrepreneur
                                    </p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Mr Singh is an energetic entrepreneur focused on
                                        building practical digital tools that simplify everyday
                                        tasks. With Numrexo, his mission is to make accurate
                                        calculations accessible to everyone — students, working
                                        professionals, and businesses — without cost or complexity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── CTA — Internal Link (UX + SEO link equity) ── */}
                    <section className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-900/40 rounded-xl p-6 md:p-10 text-center">
                        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                            Start Calculating — It's Free
                        </h2>
                        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                            No account needed. Pick any calculator and get your answer in
                            seconds.
                        </p>
                        <a
                            href="/calculators"
                            className="inline-block bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Explore All Calculators →
                        </a>
                    </section>
                </div>
            </div>
        </>
    );
}