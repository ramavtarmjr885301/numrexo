// app/privacy/page.tsx

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy: How Numrexo Handles Your Data",
  description:
    "How Numrexo handles cookies, analytics and advertising data, what Google AdSense and its vendors collect, and your rights under GDPR and CCPA.",
  path: "/privacy",
});

export default function PrivacyPage() {
    return (
        <div className="px-6 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Privacy Policy
                </h1>
                <p className="text-gray-400 mb-8 text-lg">
                    At Numrexo, your privacy is important to us. This Privacy Policy explains how information may be collected, used, and protected when you use our website and online calculator tools.
                    By accessing or using Numrexo, you agree to the practices described in this Privacy Policy.
                </p>

                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10 space-y-8">
                    {/* 1. About Numrexo */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">1. About Numrexo</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo is a smart online calculator platform that provides free calculators and digital tools across categories such as health, finance, math, fitness, business, education, real estate, and more.
                            Our goal is to provide fast, simple, and user-friendly calculation tools while maintaining user privacy and transparency.
                        </p>
                    </div>

                    {/* 2. Information We Collect */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">2. Information We Collect</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo does not require users to create an account or register to use calculator tools.
                            However, certain non-personal information may be collected automatically for analytics, security, and website improvement purposes.
                            This may include:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>browser type</li>
                            <li>device information</li>
                            <li>operating system</li>
                            <li>pages visited</li>
                            <li>referring websites</li>
                            <li>time spent on pages</li>
                            <li>IP address</li>
                            <li>general geographic location</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            We do not intentionally collect sensitive personal information through calculator usage.
                        </p>
                    </div>

                    {/* 3. Calculator Data & User Privacy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">3. Calculator Data & User Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Most calculations performed on Numrexo happen directly within your browser.
                            We do not store personal calculation inputs submitted through calculators unless explicitly stated for a specific feature or tool.
                            Users should avoid entering highly sensitive personal, financial, or confidential information into online calculators.
                        </p>
                    </div>

                    {/* 4. Cookies */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">4. Cookies</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo may use cookies and similar technologies to:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>improve website performance</li>
                            <li>remember user preferences</li>
                            <li>analyze traffic and usage behavior</li>
                            <li>support advertising services</li>
                            <li>enhance user experience</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Cookies are small files stored on your device by your web browser.
                            Users can disable cookies through browser settings if preferred. However, some website functionality may be affected.
                        </p>
                    </div>

                    {/* 5. Third-Party Services */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">5. Third-Party Services</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may use trusted third-party services to support website functionality, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>analytics providers</li>
                            <li>advertising partners</li>
                            <li>affiliate programs</li>
                            <li>performance monitoring tools</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            These third parties may collect limited information according to their own privacy policies.
                            Numrexo does not control third-party privacy practices or external websites linked from our platform.
                        </p>
                    </div>

                    {/* 6. Google Analytics */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">6. Google Analytics</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo may use Google Analytics or similar analytics tools to understand:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>user behavior</li>
                            <li>website performance</li>
                            <li>traffic patterns</li>
                            <li>platform improvements</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Analytics services may collect anonymized usage information through cookies and tracking technologies.
                            You can learn more about Google's privacy practices through Google's official policies.
                        </p>
                    </div>

                    {/* 7. Advertising, Google AdSense and Advertising Cookies */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">7. Advertising, Google AdSense &amp; Advertising Cookies</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Numrexo is a free service supported by advertising. We display advertisements
                            through Google AdSense and may participate in affiliate programs.
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3">
                            <li>Third party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
                            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to numrexo.com and/or other sites on the Internet.</li>
                            <li>
                                Users may opt out of personalised advertising by visiting{" "}
                                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Ads Settings</a>.
                            </li>
                            <li>
                                Users may opt out of a third-party vendor&apos;s use of cookies for personalised advertising at{" "}
                                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">aboutads.info/choices</a>.
                            </li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed">
                            Some links on this website may be affiliate links, meaning we may earn a
                            commission if you purchase through them, at no additional cost to you.
                            Advertising never influences the formulas or results our calculators produce.
                        </p>
                    </div>

                    {/* 8. Consent (EEA, UK and Switzerland) */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">8. Consent (EEA, UK &amp; Switzerland)</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you visit Numrexo from the European Economic Area, the United Kingdom or
                            Switzerland, we ask for your consent before any advertising or analytics
                            cookies are set. You can change or withdraw that consent at any time using
                            the privacy settings link in the site footer. If you decline, you can still
                            use every calculator on this site; you will simply see non-personalised ads.
                        </p>
                    </div>

                    {/* 9. Your rights under the GDPR */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">9. Your Rights Under the GDPR</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            If you are in the European Economic Area or the United Kingdom, the General
                            Data Protection Regulation gives you rights over your personal data. Numrexo
                            is the data controller for this website and can be reached at{" "}
                            <a href="mailto:support@numrexo.com" className="text-blue-400 hover:underline">support@numrexo.com</a>.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We process data on two legal bases: your consent, for advertising and
                            analytics cookies; and our legitimate interest in operating and securing the
                            website, for basic server logs.
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3">
                            <li><span className="text-white font-medium">Access</span> — ask what personal data we hold about you.</li>
                            <li><span className="text-white font-medium">Rectification</span> — ask us to correct inaccurate data.</li>
                            <li><span className="text-white font-medium">Erasure</span> — ask us to delete your data.</li>
                            <li><span className="text-white font-medium">Restriction</span> — ask us to limit how we process it.</li>
                            <li><span className="text-white font-medium">Portability</span> — receive your data in a portable format.</li>
                            <li><span className="text-white font-medium">Objection</span> — object to processing based on legitimate interest.</li>
                            <li><span className="text-white font-medium">Withdraw consent</span> — at any time, without affecting prior processing.</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed">
                            Email <a href="mailto:support@numrexo.com" className="text-blue-400 hover:underline">support@numrexo.com</a> to
                            exercise any of these rights. We respond within 30 days. You also have the
                            right to complain to your national data protection authority.
                        </p>
                    </div>

                    {/* 10. Your rights under the CCPA / CPRA */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">10. Your Rights Under the CCPA / CPRA</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            If you are a California resident, the California Consumer Privacy Act, as
                            amended by the CPRA, gives you the following rights:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3">
                            <li><span className="text-white font-medium">Right to know</span> — what personal information we collect and how it is used.</li>
                            <li><span className="text-white font-medium">Right to delete</span> — request deletion of personal information we hold.</li>
                            <li><span className="text-white font-medium">Right to correct</span> — request correction of inaccurate personal information.</li>
                            <li><span className="text-white font-medium">Right to opt out</span> — opt out of the sale or sharing of personal information.</li>
                            <li><span className="text-white font-medium">Right to non-discrimination</span> — we will not treat you differently for exercising these rights.</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            <span className="text-white font-medium">Do Not Sell or Share My Personal Information.</span>{" "}
                            Numrexo does not sell your personal information for money. Advertising
                            cookies used for personalised ads may qualify as &quot;sharing&quot; under the CPRA.
                            To opt out, use the privacy settings link in the site footer, or email{" "}
                            <a href="mailto:support@numrexo.com" className="text-blue-400 hover:underline">support@numrexo.com</a> with
                            the subject line &quot;CCPA Opt-Out&quot;.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            We verify requests by replying to the email address they are sent from, and
                            respond within 45 days.
                        </p>
                    </div>

                    {/* 11. Data Security */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">11. Data Security</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We take reasonable measures to help protect website systems and user information from unauthorized access, misuse, or security threats.
                            However, no online platform or internet transmission method can guarantee complete security.
                            Users access and use Numrexo at their own discretion and risk.
                        </p>
                    </div>

                    {/* 12. External Links */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">12. External Links</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo may contain links to third-party websites or services.
                            We are not responsible for:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>external website content</li>
                            <li>privacy practices</li>
                            <li>security policies</li>
                            <li>third-party services</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Users should review the privacy policies of external websites before interacting with them.
                        </p>
                    </div>

                    {/* 13. Children's Privacy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">13. Children's Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo is not specifically directed toward children under the age of 13.
                            We do not knowingly collect personal information from children.
                            If you believe a child has provided personal information through our platform, please contact us so appropriate action can be taken.
                        </p>
                    </div>

                    {/* 14. Your Privacy Choices */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">14. Your Privacy Choices</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Users may:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>disable cookies through browser settings</li>
                            <li>limit tracking preferences</li>
                            <li>stop using the website at any time</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Some features may function differently if cookies are disabled.
                        </p>
                    </div>

                    {/* 15. Changes to This Privacy Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">15. Changes to This Privacy Policy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may update or modify this Privacy Policy periodically to reflect:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>legal updates</li>
                            <li>service improvements</li>
                            <li>platform changes</li>
                            <li>advertising or analytics updates</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Updated versions will become effective immediately after publication on this page.
                            Users are encouraged to review this page regularly.
                        </p>
                    </div>

                    {/* 16. Contact Us */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">16. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have questions about this Privacy Policy, or wish to exercise any of the rights described above, email us at support@numrexo.com or use the Contact page on this website.
                        </p>
                    </div>

                    {/* Last Updated */}
                    <div className="pt-4 border-t border-gray-800">
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Last Updated:</span> 9 September 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}