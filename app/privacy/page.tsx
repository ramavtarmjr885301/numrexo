export default function PrivacyPage() {
    return (
        <div className="px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Privacy Policy
                </h1>
                <p className="text-gray-400 mb-8">
                    At Numrexo, your privacy is important to us. This Privacy Policy explains how information may be collected, used, and protected when you use our website and online calculator tools.
                    By accessing or using Numrexo, you agree to the practices described in this Privacy Policy.
                </p>

                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8 space-y-6">
                    {/* 1. About Numrexo */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">1. About Numrexo</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo is a smart online calculator platform that provides free calculators and digital tools across categories such as health, finance, math, fitness, business, education, real estate, and more.
                            Our goal is to provide fast, simple, and user-friendly calculation tools while maintaining user privacy and transparency.
                        </p>
                    </div>

                    {/* 2. Information We Collect */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">2. Information We Collect</h2>
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
                        <h2 className="text-xl font-bold mb-3 text-blue-400">3. Calculator Data & User Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Most calculations performed on Numrexo happen directly within your browser.
                            We do not store personal calculation inputs submitted through calculators unless explicitly stated for a specific feature or tool.
                            Users should avoid entering highly sensitive personal, financial, or confidential information into online calculators.
                        </p>
                    </div>

                    {/* 4. Cookies */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">4. Cookies</h2>
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
                        <h2 className="text-xl font-bold mb-3 text-blue-400">5. Third-Party Services</h2>
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
                        <h2 className="text-xl font-bold mb-3 text-blue-400">6. Google Analytics</h2>
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

                    {/* 7. Advertising & Affiliate Disclosure */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">7. Advertising & Affiliate Disclosure</h2>
                        <p className="text-gray-300 leading-relaxed">
                            To support platform growth and operations, Numrexo may display advertisements and participate in affiliate marketing programs.
                            Third-party advertising networks may use cookies or tracking technologies to deliver personalized advertisements based on browsing behavior.
                            Some links on our website may be affiliate links, meaning we may earn a commission if users interact with or purchase through those links at no additional cost to users.
                        </p>
                    </div>

                    {/* 8. Data Security */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">8. Data Security</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We take reasonable measures to help protect website systems and user information from unauthorized access, misuse, or security threats.
                            However, no online platform or internet transmission method can guarantee complete security.
                            Users access and use Numrexo at their own discretion and risk.
                        </p>
                    </div>

                    {/* 9. External Links */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">9. External Links</h2>
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

                    {/* 10. Children's Privacy */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">10. Children's Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo is not specifically directed toward children under the age of 13.
                            We do not knowingly collect personal information from children.
                            If you believe a child has provided personal information through our platform, please contact us so appropriate action can be taken.
                        </p>
                    </div>

                    {/* 11. Your Privacy Choices */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">11. Your Privacy Choices</h2>
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

                    {/* 12. Changes to This Privacy Policy */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">12. Changes to This Privacy Policy</h2>
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

                    {/* 13. Contact Us */}
                    <div>
                        <h2 className="text-xl font-bold mb-3 text-blue-400">13. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have questions about this Privacy Policy or your privacy while using Numrexo, please contact us through the official Contact page available on our website.
                        </p>
                    </div>

                    {/* Last Updated */}
                    <div className="pt-4 border-t border-gray-800">
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Last Updated:</span> May 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}