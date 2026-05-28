"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CALCULATORS } from "@/data/calculators";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-[#0f1525] border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          {/* Calculators */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Calculators</h5>
            <div className="space-y-2">
              {CALCULATORS.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => router.push(calc.path)}
                  className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {calc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Company</h5>
            <div className="space-y-2">
              <button onClick={() => router.push("/about")} className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">
                About
              </button>
              <a href="#" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Blog</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Legal</h5>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <button
                onClick={() => router.push("/terms")}
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Use
              </button>
              <a href="#" className="block text-sm text-gray-400 hover:text-blue-400 transition-colors">Disclaimer</a>
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