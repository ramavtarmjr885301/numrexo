import { Metadata } from "next";

// ─── METADATA ─────────────────────────────────────────────
export const metadata: Metadata = {
    title: "Disclaimer | Numrexo – Free Online Calculators",
    description: "Read the official disclaimer for Numrexo.com. Our free online calculators (BMI, EMI, GST, SIP, Age, Percentage) provide informational results only. We do not store user data. Always consult a qualified professional for medical, financial, or legal advice.",
    keywords: [
        "numrexo disclaimer",
        "calculator disclaimer",
        "online calculator terms",
        "numrexo terms",
        "informational calculator",
        "bmi calculator disclaimer",
        "emi calculator disclaimer"
    ],
    robots: "index, follow",
    alternates: {
        canonical: "https://numrexo.com/disclaimer",
    },
    openGraph: {
        type: "website",
        url: "https://numrexo.com/disclaimer",
        title: "Disclaimer | Numrexo – Free Online Calculators",
        description: "Read the official disclaimer for Numrexo.com. Our calculators provide informational results only. No user data is stored. Consult a qualified professional before making decisions.",
        siteName: "Numrexo",
        images: [
            {
                url: "https://numrexo.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Numrexo — Free Online Calculators Disclaimer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Disclaimer | Numrexo – Free Online Calculators",
        description: "Numrexo calculator results are for informational purposes only. No medical, financial, or legal advice. No data stored.",
        images: ["https://numrexo.com/og-image.png"],
    },
};

// ─── STRUCTURED DATA — WebPage Schema ─────────────────────────
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer",
    "url": "https://numrexo.com/disclaimer",
    "description": "Official disclaimer for Numrexo.com. Calculator results are informational only. No user data is stored.",
    "inLanguage": "en",
    "isPartOf": {
        "@type": "WebSite",
        "name": "Numrexo",
        "url": "https://numrexo.com"
    },
    "dateModified": "2026-05-28",
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://numrexo.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Disclaimer",
                "item": "https://numrexo.com/disclaimer"
            }
        ]
    }
};

// ─── STRUCTURED DATA — FAQPage Schema ─────────────────────────
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Are Numrexo calculator results accurate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Numrexo calculators are designed for informational and educational purposes only. While we strive for accuracy, results may not reflect your exact real-world situation. Always consult a qualified professional before making health, financial, or legal decisions."
            }
        },
        {
            "@type": "Question",
            "name": "Does Numrexo store my calculation data?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. All calculations on Numrexo are processed entirely within your browser. We do not collect, store, or transmit any data you enter into our calculators."
            }
        },
        {
            "@type": "Question",
            "name": "Is Numrexo a substitute for professional medical or financial advice?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Numrexo is not a licensed medical, financial, legal, or tax advisor. Results from our calculators should not replace advice from a qualified professional."
            }
        }
    ]
};

export default function DisclaimerPage() {
    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="px-6 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-sm">
                            <li>
                                <a href="/" className="text-blue-500 hover:text-blue-400 transition-colors">Home</a>
                            </li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-400" aria-current="page">Disclaimer</li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
                            <span className="text-sm font-semibold text-orange-400">Legal</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Disclaimer
                        </h1>
                        <p className="text-gray-400 text-base mb-6 leading-relaxed max-w-3xl">
                            Please read this disclaimer carefully before using any calculator or tool on Numrexo. By accessing this website, you agree to the terms outlined below.
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <span>Last Updated: May 28, 2026</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <span>Effective Immediately</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <span>Applies to All Calculators</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Summary Box */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-10">
                        <p className="text-gray-300 leading-relaxed text-sm">
                            <strong className="text-orange-400">Quick Summary:</strong> Numrexo provides free online calculators for informational and educational purposes only. Results are <strong className="text-white">not</strong> professional medical, financial, legal, or tax advice. We do not store any data you enter. For important decisions, always consult a qualified professional.
                        </p>
                    </div>

                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8 space-y-6">
                        {/* SECTION 1: General Information */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">01</div>
                                <h2 className="text-xl font-semibold text-white">General Information Only</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                The content, tools, and calculators available on <strong className="text-white">Numrexo.com</strong> are provided solely for general informational and educational purposes. The results generated by our calculators — including but not limited to BMI, EMI, GST, SIP, Age, and Percentage calculations — are estimates based on the input values you provide.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                These results are intended to give you a general idea and starting point for further exploration. They are <strong className="text-white">not</strong> intended to be definitive, exhaustive, or suitable as a substitute for professional guidance.
                            </p>
                            <div className="bg-gray-800/50 border-l-4 border-orange-500 rounded-r-xl p-4 mt-4">
                                <p className="text-gray-300 text-sm"><strong className="text-orange-400">Important:</strong> No content on Numrexo.com constitutes professional medical, financial, investment, legal, or tax advice. Do not make significant life decisions based solely on our calculator results.</p>
                            </div>
                        </section>

                        {/* SECTION 2: No Professional Advice */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">02</div>
                                <h2 className="text-xl font-semibold text-white">Not a Substitute for Professional Advice</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                Numrexo is not a licensed medical provider, financial advisor, certified public accountant, or legal counselor. The following types of advice are specifically <strong className="text-white">not provided</strong> by our calculators:
                            </p>
                            <ul className="space-y-2 text-gray-400 leading-relaxed mb-3">
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">✓</span> <strong className="text-white">Medical Advice:</strong> BMI and health-related calculators do not diagnose, treat, cure, or prevent any disease or health condition.</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">✓</span> <strong className="text-white">Financial Advice:</strong> EMI, SIP, and compound interest calculators are not investment recommendations or loan approvals.</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">✓</span> <strong className="text-white">Tax Advice:</strong> GST and percentage calculators do not constitute official tax guidance or filing instructions.</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">✓</span> <strong className="text-white">Legal Advice:</strong> No content on this website creates an attorney-client relationship or constitutes legal counsel.</li>
                            </ul>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                We strongly recommend that you consult a qualified professional — such as a licensed doctor, certified financial planner, chartered accountant, or attorney — before making decisions based on any calculation results.
                            </p>
                        </section>

                        {/* SECTION 3: Calculators on Numrexo */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">03</div>
                                <h2 className="text-xl font-semibold text-white">Our Calculators — Scope and Limitations</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                The following calculators are currently available on Numrexo. Each is designed to provide quick, approximate results and carries its own limitations:
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-800/50">
                                        <tr>
                                            <th className="text-left p-3 text-gray-300 font-semibold">Calculator</th>
                                            <th className="text-left p-3 text-gray-300 font-semibold">Category</th>
                                            <th className="text-left p-3 text-gray-300 font-semibold">Key Limitation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-800">
                                            <td className="p-3 text-gray-200 font-medium">BMI Calculator</td>
                                            <td className="p-3"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Health</span></td>
                                            <td className="p-3 text-gray-400">BMI does not account for age, sex, ethnicity, muscle mass, or body composition.</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                            <td className="p-3 text-gray-200 font-medium">EMI Calculator</td>
                                            <td className="p-3"><span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Finance</span></td>
                                            <td className="p-3 text-gray-400">Results are indicative. Actual EMI may vary based on lender terms, processing fees, and credit profile.</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                            <td className="p-3 text-gray-200 font-medium">GST Calculator</td>
                                            <td className="p-3"><span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">Tax</span></td>
                                            <td className="p-3 text-gray-400">Based on standard Indian GST slabs. Does not account for exemptions, special categories, or state-level variations.</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                            <td className="p-3 text-gray-200 font-medium">SIP Calculator</td>
                                            <td className="p-3"><span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Finance</span></td>
                                            <td className="p-3 text-gray-400">Assumes a fixed rate of return. Actual mutual fund returns fluctuate with market conditions.</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                            <td className="p-3 text-gray-200 font-medium">Age Calculator</td>
                                            <td className="p-3"><span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">Math</span></td>
                                            <td className="p-3 text-gray-400">Calculates based on the dates provided. Leap year handling applies.</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                            <td className="p-3 text-gray-200 font-medium">Percentage Calculator</td>
                                            <td className="p-3"><span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">Math</span></td>
                                            <td className="p-3 text-gray-400">Results are mathematically derived. Verify independently for high-stakes use.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* SECTION 4: Accuracy & Errors */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">04</div>
                                <h2 className="text-xl font-semibold text-white">Accuracy, Errors, and Omissions</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                While we make every reasonable effort to ensure that the formulas and logic used in our calculators are accurate, <strong className="text-white">Numrexo makes no warranty, express or implied, as to the accuracy, reliability, completeness, or timeliness of any result produced by our tools.</strong>
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-2 text-sm">
                                Calculator results may be affected by:
                            </p>
                            <ul className="space-y-1 text-gray-400 leading-relaxed mb-3 ml-4">
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Incorrect or incomplete input data provided by the user</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Rounding differences in intermediate calculations</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Changes in regulations, tax slabs, or financial norms after the date of last update</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Browser compatibility or JavaScript rendering issues</li>
                            </ul>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Numrexo reserves the right to correct, update, modify, or remove any calculator or its underlying formula at any time without prior notice.
                            </p>
                        </section>

                        {/* SECTION 5: No Data Storage */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">05</div>
                                <h2 className="text-xl font-semibold text-white">No Data Storage — Your Privacy is Protected</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                Numrexo is built with privacy as a core principle. <strong className="text-white">All calculations on this website are performed entirely within your web browser.</strong> We do not collect, record, transmit, or store any values you enter into our calculators on our servers.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-2 text-sm">
                                This means:
                            </p>
                            <ul className="space-y-1 text-gray-400 leading-relaxed mb-3 ml-4">
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500">✓</span> Your financial inputs (loan amount, salary, investments) are never sent to our servers</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500">✓</span> Your health data (weight, height) remains on your device only</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500">✓</span> We do not use your calculation inputs for advertising, profiling, or analytics</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-green-500">✓</span> No account or sign-up is required — ever</li>
                            </ul>
                            <div className="bg-gray-800/50 border-l-4 border-orange-500 rounded-r-xl p-4">
                                <p className="text-gray-300 text-sm">For further details on how we handle your data, please review our <a href="/privacy" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">Privacy Policy</a>.</p>
                            </div>
                        </section>

                        {/* SECTION 6: External Links */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">06</div>
                                <h2 className="text-xl font-semibold text-white">Third-Party Links and External Websites</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Numrexo may, from time to time, include links to third-party websites, references, or resources for your convenience. These links are provided for informational purposes only.
                                Numrexo does not endorse, control, or take responsibility for the content, accuracy, privacy practices, or availability of any third-party website. <strong className="text-white">Accessing any external link is entirely at your own risk.</strong> We encourage you to review the privacy policy and terms of service of any website you visit.
                            </p>
                        </section>

                        {/* SECTION 7: Limitation of Liability */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">07</div>
                                <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                To the fullest extent permitted by applicable law, <strong className="text-white">Numrexo, its owners, operators, employees, and contributors shall not be liable</strong> for any direct, indirect, incidental, consequential, special, or punitive damages arising from:
                            </p>
                            <ul className="space-y-1 text-gray-400 leading-relaxed mb-3 ml-4">
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Your use of or reliance on any calculator result or information on this website</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Errors, inaccuracies, or omissions in any content or tool</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Interruptions, bugs, or unavailability of the website or its features</li>
                                <li className="flex items-start gap-2 text-sm"><span className="text-orange-500">•</span> Decisions made based on results from our calculators without consulting a professional</li>
                            </ul>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                By using Numrexo, you acknowledge that you are doing so voluntarily and at your own discretion, and that you assume full responsibility for any actions taken based on the results provided.
                            </p>
                        </section>

                        {/* SECTION 8: Intellectual Property */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">08</div>
                                <h2 className="text-xl font-semibold text-white">Intellectual Property</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                All content on Numrexo.com — including but not limited to text, calculator logic, design, layout, graphics, and code — is the intellectual property of Numrexo and is protected under applicable copyright and intellectual property laws.
                                You may use our calculators for personal, non-commercial purposes. Reproduction, distribution, scraping, or replication of any part of this website without prior written permission from Numrexo is strictly prohibited.
                            </p>
                        </section>

                        {/* SECTION 9: Changes to Disclaimer */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">09</div>
                                <h2 className="text-xl font-semibold text-white">Changes to This Disclaimer</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Numrexo reserves the right to update, modify, or replace this Disclaimer at any time without prior notice. Changes will take effect immediately upon being published on this page. The <strong className="text-white">"Last Updated"</strong> date at the top of this page will reflect the most recent revision.
                                We encourage you to review this Disclaimer periodically to stay informed of any changes. Your continued use of Numrexo after any update constitutes your acceptance of the revised terms.
                            </p>
                        </section>

                        {/* SECTION 10: Governing Law */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">10</div>
                                <h2 className="text-xl font-semibold text-white">Governing Law and Jurisdiction</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                This Disclaimer is governed by and construed in accordance with applicable laws. As Numrexo serves a global audience, users are responsible for ensuring their use of this website complies with local laws and regulations in their respective jurisdictions.
                                Any disputes arising from the use of Numrexo.com shall be subject to the exclusive jurisdiction of the courts in the applicable legal territory, to the extent permitted by law.
                            </p>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">11</div>
                                <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-gray-800/30 rounded-lg p-4">
                                    <p className="font-semibold text-gray-200 text-sm mb-1">Are Numrexo calculator results accurate?</p>
                                    <p className="text-gray-400 text-sm">Our calculators use standard formulas and are designed to be as accurate as possible. However, results are approximate and for informational use only. Always verify with a qualified professional before making decisions.</p>
                                </div>
                                <div className="bg-gray-800/30 rounded-lg p-4">
                                    <p className="font-semibold text-gray-200 text-sm mb-1">Does Numrexo store my personal or financial data?</p>
                                    <p className="text-gray-400 text-sm">No. All calculations are processed locally in your browser. We do not collect, store, or transmit any data you enter into our calculators.</p>
                                </div>
                                <div className="bg-gray-800/30 rounded-lg p-4">
                                    <p className="font-semibold text-gray-200 text-sm mb-1">Can I use Numrexo results for official or legal purposes?</p>
                                    <p className="text-gray-400 text-sm">No. Results from Numrexo calculators are not legally recognized documents and should not be used for official filings, loan applications, medical reports, or legal proceedings.</p>
                                </div>
                                <div className="bg-gray-800/30 rounded-lg p-4">
                                    <p className="font-semibold text-gray-200 text-sm mb-1">Is Numrexo free to use?</p>
                                    <p className="text-gray-400 text-sm">Yes. All calculators on Numrexo are 100% free to use. No registration, subscription, or payment is required.</p>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">12</div>
                                <h2 className="text-xl font-semibold text-white">Contact Us</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-3 text-sm">
                                If you have questions, concerns, or feedback about this Disclaimer, or if you believe any content on Numrexo is inaccurate, please reach out to us. We are committed to addressing your concerns promptly.
                            </p>
                            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <p className="text-gray-300 text-sm">
                                    <strong>Website:</strong> numrexo.com<br />
                                    We typically respond within 2–3 business days.
                                </p>
                                <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm">
                                    Contact Us →
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}