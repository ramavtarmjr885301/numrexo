"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Social Media Icons as components
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const router = useRouter();

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/numrexo", icon: InstagramIcon },
    { name: "Facebook", href: "https://facebook.com/numrexo", icon: FacebookIcon },
    { name: "LinkedIn", href: "https://linkedin.com/company/numrexo", icon: LinkedInIcon },
    { name: "X (Twitter)", href: "https://x.com/numrexo", icon: XIcon },
  ];

  return (
    <footer className="bg-[#0f1525] border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-extrabold">
                Num<span className="text-blue-500">rexo</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free, accurate, and fast online calculators for health, finance, tax, and everyday math.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h5>
            <div className="space-y-2">
              <button onClick={() => router.push("/health")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Health
              </button>
              <button onClick={() => router.push("/fitness")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Fitness
              </button>
              <button onClick={() => router.push("/finance")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Finance
              </button>
              <button onClick={() => router.push("/math")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Mathematics
              </button>
              <button onClick={() => router.push("/tax")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Tax
              </button>
              <button onClick={() => router.push("/conversion")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Conversions
              </button>
              <button onClick={() => router.push("/education")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Education
              </button>
              <button onClick={() => router.push("/construction")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Construction
              </button>
              <button onClick={() => router.push("/business")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Businsee
              </button>
              <button onClick={() => router.push("/science")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Science
              </button>
              <button onClick={() => router.push("/time")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Time & Date
              </button>
              <button onClick={() => router.push("/cooking")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Cooking
              </button>
              <button onClick={() => router.push("/travel")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Travel
              </button>
              <button onClick={() => router.push("/investment")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Investment
              </button>

            </div>
            {/* Famous Calculators */}
          </div>
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Calculators</h5>
            <div className="space-y-2">
              <button onClick={() => router.push("/health/bmi-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                BMI Calculator
              </button>
              <button onClick={() => router.push("/fitness/bmr-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                BMR Calculator
              </button>
              <button onClick={() => router.push("/tax/gst-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                GST Calculator
              </button>
              <button onClick={() => router.push("/business/invoice-generator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Invoice Generator
              </button>
              <button onClick={() => router.push("/finance/emi-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                EMI Calculator
              </button>
              <button onClick={() => router.push("/fitness/body-fat-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Body Fat Calculator
              </button>
              <button onClick={() => router.push("/health/pregnancy-due-date-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Pregnancy Due Date
              </button>
              <button onClick={() => router.push("/construction/concrete-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Concrete Calculator
              </button>
              <button onClick={() => router.push("/business/roi-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                ROI Calculator
              </button>
              <button onClick={() => router.push("/travel/travel-budget-calculator")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Travel Budget Cal..
              </button>


            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Company</h5>
            <div className="space-y-2">
              <button onClick={() => router.push("/about")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                About
              </button>
              <button onClick={() => router.push("/contact")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Contact
              </button>
              <a href="#" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Blog</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Legal</h5>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/privacy")}
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => router.push("/terms")}
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Use
              </button>
              <button
                onClick={() => router.push("/disclaimer")}
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Disclaimer
              </button>
            </div>
          </div>

          {/* Social Media - 2x2 Grid with small gap */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Follow Us</h5>
            <div className="grid grid-cols-2 gap-1.5 w-fit">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 Numrexo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}