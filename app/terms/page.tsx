export default function TermsPage() {
    return (
        <div className="px-6 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Terms and Conditions
                </h1>
                <p className="text-gray-400 mb-8 text-lg">
                    Welcome to Numrexo. By accessing or using our website, you agree to comply with the following Terms and Conditions. Please read these terms carefully before using our platform.
                    If you do not agree with any part of these terms, please discontinue the use of Numrexo.
                </p>

                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-10 space-y-8">
                    {/* 1. Acceptance of Terms */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">1. Acceptance of Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            By using Numrexo, you confirm that you accept these Terms and Conditions and agree to follow all applicable laws and regulations while using our website and calculator tools.
                            These terms apply to all visitors, users, and anyone accessing the platform.
                        </p>
                    </div>

                    {/* 2. About Numrexo */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">2. About Numrexo</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo is a free online calculator platform that provides calculators and digital tools across multiple categories, including health, finance, math, fitness, business, education, real estate, and other utility-based calculations.
                            Our tools are designed to provide quick and easy estimates and informational calculations for general use.
                        </p>
                    </div>

                    {/* 3. Use of Our Website */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">3. Use of Our Website</h2>
                        <p className="text-gray-300 leading-relaxed mb-2">
                            You agree to use Numrexo only for lawful purposes.
                            You must not:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4">
                            <li>misuse the website or calculators</li>
                            <li>attempt unauthorized access to our systems</li>
                            <li>interfere with website performance or security</li>
                            <li>use automated systems to overload the platform</li>
                            <li>copy or reproduce website content without permission</li>
                            <li>use the platform for fraudulent or harmful activities</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            We reserve the right to restrict access to users who violate these terms.
                        </p>
                    </div>

                    {/* 4. Calculator Accuracy Disclaimer */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">4. Calculator Accuracy Disclaimer</h2>
                        <p className="text-gray-300 leading-relaxed">
                            While we strive to provide accurate and regularly updated calculators, Numrexo does not guarantee the completeness, accuracy, reliability, or suitability of any calculation results.
                            Calculator outputs should be used for:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>general informational purposes</li>
                            <li>educational use</li>
                            <li>personal estimation</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Users should independently verify important calculations before making financial, legal, medical, business, or professional decisions.
                        </p>
                    </div>

                    {/* 5. No Professional Advice */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">5. No Professional Advice</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The content and calculators available on Numrexo do not constitute:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>financial advice</li>
                            <li>medical advice</li>
                            <li>legal advice</li>
                            <li>tax advice</li>
                            <li>investment advice</li>
                            <li>professional consultation</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Always consult qualified professionals for advice related to your specific situation.
                        </p>
                    </div>

                    {/* 6. User Responsibility */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">6. User Responsibility</h2>
                        <p className="text-gray-300 leading-relaxed">
                            You are solely responsible for:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>how you use the calculators</li>
                            <li>decisions made based on calculation results</li>
                            <li>verifying entered data and outputs</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            Numrexo shall not be held responsible for losses, damages, or consequences resulting from the use of our tools or information.
                        </p>
                    </div>

                    {/* 7. Intellectual Property */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">7. Intellectual Property</h2>
                        <p className="text-gray-300 leading-relaxed">
                            All content on Numrexo, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>text</li>
                            <li>design</li>
                            <li>branding</li>
                            <li>graphics</li>
                            <li>logos</li>
                            <li>calculator structure</li>
                            <li>website functionality</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            is protected by intellectual property and copyright laws.
                            Unauthorized copying, distribution, modification, or reproduction of website content is prohibited without written permission.
                        </p>
                    </div>

                    {/* 8. Third-Party Services */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">8. Third-Party Services</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo may use third-party services, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>analytics tools</li>
                            <li>advertising networks</li>
                            <li>affiliate programs</li>
                            <li>external links</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            We are not responsible for the content, privacy practices, or policies of third-party websites or services.
                            Users access third-party services at their own discretion and risk.
                        </p>
                    </div>

                    {/* 9. Advertisements and Affiliate Disclosure */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">9. Advertisements and Affiliate Disclosure</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Numrexo may display advertisements and participate in affiliate marketing programs to support platform operations and future development.
                            Some links on the website may generate commissions at no additional cost to users.
                            However, advertisements or affiliate relationships do not influence our commitment to providing useful and unbiased calculator tools.
                        </p>
                    </div>

                    {/* 10. Website Availability */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">10. Website Availability</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We aim to keep Numrexo accessible at all times, but we do not guarantee uninterrupted availability.
                            We may:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>update calculators</li>
                            <li>modify features</li>
                            <li>perform maintenance</li>
                            <li>suspend access temporarily</li>
                            <li>remove content without prior notice</li>
                        </ul>
                    </div>

                    {/* 11. Limitation of Liability */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">11. Limitation of Liability</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Under no circumstances shall Numrexo, its founder, team members, or affiliates be liable for:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 ml-4 mt-2">
                            <li>direct damages</li>
                            <li>indirect damages</li>
                            <li>financial losses</li>
                            <li>business interruption</li>
                            <li>data loss</li>
                            <li>calculation inaccuracies</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-2">
                            arising from the use or inability to use the platform.
                            Use of Numrexo is entirely at your own risk.
                        </p>
                    </div>

                    {/* 12. Privacy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">12. Privacy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Your use of Numrexo is also governed by our Privacy Policy, which explains how information may be collected and used while accessing the website.
                        </p>
                    </div>

                    {/* 13. Changes to Terms */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">13. Changes to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to update or modify these Terms and Conditions at any time without prior notice.
                            Updated versions will become effective immediately after being published on this page.
                            Users are encouraged to review this page periodically.
                        </p>
                    </div>

                    {/* 14. Contact Us */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-400">14. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have any questions regarding these Terms and Conditions, you may contact us through the official contact page available on Numrexo.
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