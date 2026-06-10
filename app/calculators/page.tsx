"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import CalculatorCard from "@/components/common/CalculatorCard";
import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";

export default function CalculatorsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = CATEGORIES || {};

  const filteredCalculators = useMemo(() => {
    return CALCULATORS_REGISTRY.filter((calc) => {
      const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        calc.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">All Tools</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Browse All Calculators</h1>
          <p className="text-gray-400">Free, accurate calculators for every need</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
                }`}
            >
              All
            </button>
            {Object.entries(categories).map(([key, cat]: [string, any]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === key
                  ? "bg-blue-500 text-white"
                  : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
                  }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Found {filteredCalculators.length} calculators
        </div>

        {/* Calculator Grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc) => (
              <CalculatorCard
                key={calc.id}
                calculator={calc}
                onClick={() => router.push(calc.path)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No calculators found. Try a different search term.</p>
          </div>
        )}

        {/* ✅ SIRF YEH CONTENT ADD KIYA HAI - SEO Content Section (No Footer - Sirf Content) */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column */}
            <div className="text-sm text-gray-400 space-y-3">
              <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Free Online Calculators?</h2>
              <p>
                Numrexo is a <strong className="text-white">free online calculator platform</strong> built for speed, accuracy, and simplicity.
                Whether you need to calculate your <strong className="text-white">Body Mass Index (BMI)</strong>, figure out your monthly loan
                <strong className="text-white">EMI (Equated Monthly Installment)</strong>, work out a percentage change, or estimate your GST or SIP returns —
                Numrexo has a dedicated, purpose-built calculator for every need.
              </p>
              <p>
                Our <strong className="text-white">BMI Calculator</strong> uses the World Health Organization (WHO) standard formula, giving you
                instant insight into whether your weight falls in the healthy range. The <strong className="text-white">EMI Calculator</strong>
                applies the standard amortization formula used by banks globally, helping you plan home loans, car loans, or personal loans
                with complete transparency.
              </p>
              <p>
                The <strong className="text-white">Percentage Calculator</strong> handles percentage increase, decrease, and difference in seconds —
                perfect for students, teachers, shoppers, and business professionals. The <strong className="text-white">Age Calculator</strong>
                gives your exact age in years, months, and days — useful for official documents, medical records, or just satisfying curiosity.
              </p>
            </div>

            {/* Right Column */}
            <div className="text-sm text-gray-400 space-y-3">
              <h2 className="text-lg font-semibold text-white mb-3">Privacy First & Global Access</h2>
              <p>
                <strong className="text-white">Privacy first:</strong> every calculation happens entirely inside your browser.
                Numrexo never stores, logs, or shares your input data. No account, no email, no tracking — just instant answers.
              </p>
              <p>
                Numrexo works seamlessly on all devices — desktop, tablet, and mobile. There is no app to download.
                Open your browser, pick a calculator, enter your values, and get results in under a second.
              </p>
              <p>
                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations
                happen in your browser — your data stays private and secure.
              </p>

              <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-300/80">
                  💡 <strong className="text-blue-300">Pro Tip:</strong> Use the search bar above to find any calculator quickly — just type
                  "BMI", "EMI", "GST", or any calculator name. Bookmark this page for instant access to all tools!
                </p>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
            <p>Popular Calculators:
              <a href="/health/bmi-calculator" className="text-blue-400 hover:underline mx-1">BMI Calculator</a> •
              <a href="/finance/emi-calculator" className="text-blue-400 hover:underline mx-1">EMI Calculator</a> •
              <a href="/tax/gst-calculator" className="text-blue-400 hover:underline mx-1">GST Calculator</a> •
              <a href="/math/age-calculator" className="text-blue-400 hover:underline mx-1">Age Calculator</a> •
              <a href="/math/percentage-calculator" className="text-blue-400 hover:underline mx-1">Percentage Calculator</a> •
              <a href="/investment/sip-calculator" className="text-blue-400 hover:underline mx-1">SIP Calculator</a>
            </p>
            <p className="mt-2 text-gray-600 text-[11px]">
              <span className="text-gray-500">🧮 Free online calculators for every need | </span>
              <span className="text-gray-500">100% privacy-first | </span>
              <span className="text-gray-500">No sign-up, no tracking</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}