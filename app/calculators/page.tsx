// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Search, ChevronRight } from "lucide-react";
// import CalculatorCard from "@/components/common/CalculatorCard";
// import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";

// export default function CalculatorsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const initialSearch = searchParams.get("search") || "";

//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const categories = CATEGORIES || {};

//   // Update searchTerm when URL param changes
//   useEffect(() => {
//     const searchParam = searchParams.get("search");
//     if (searchParam !== null && searchParam !== searchTerm) {
//       setSearchTerm(searchParam);
//     }
//   }, [searchParams, searchTerm]);

//   const filteredCalculators = useMemo(() => {
//     return CALCULATORS_REGISTRY.filter((calc) => {
//       const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         calc.desc.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchTerm, selectedCategory]);

//   // First 6 calculators as cards, rest as links
//   const cardCalculators = filteredCalculators.slice(0, 6);
//   const linkCalculators = filteredCalculators.slice(6);

//   // Update URL when search changes (optional - for shareable links)
//   const handleSearchChange = (value: string) => {
//     setSearchTerm(value);
//     const url = new URL(window.location.href);
//     if (value) {
//       url.searchParams.set("search", value);
//     } else {
//       url.searchParams.delete("search");
//     }
//     router.replace(url.pathname + url.search, { scroll: false });
//   };

//   return (
//     <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 sm:mb-10">
//           <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">All Tools</span>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">Browse All Calculators</h1>
//           <p className="text-gray-400 text-sm sm:text-base">Free, accurate calculators for every need</p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6 sm:mb-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search calculators..."
//               value={searchTerm}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#111827] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors text-sm sm:text-base"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => handleSearchChange("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Category Filter - Now wraps on mobile */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setSelectedCategory("all")}
//               className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === "all"
//                 ? "bg-blue-500 text-white"
//                 : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
//                 }`}
//             >
//               All
//             </button>
//             {Object.entries(categories).map(([key, cat]: [string, any]) => (
//               <button
//                 key={key}
//                 onClick={() => setSelectedCategory(key)}
//                 className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === key
//                   ? "bg-blue-500 text-white"
//                   : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
//                   }`}
//               >
//                 {cat.icon} {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
//           Found {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? "s" : ""}
//         </div>

//         {/* DESKTOP VIEW: Calculator Cards Grid - First 6 (hidden on mobile) */}
//         {cardCalculators.length > 0 && (
//           <>
//             <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {cardCalculators.map((calc) => (
//                 <CalculatorCard
//                   key={calc.id}
//                   calculator={calc}
//                   onClick={() => router.push(calc.path)}
//                 />
//               ))}
//             </div>

//             {/* DESKTOP VIEW: Divider between cards and links (hidden on mobile) */}
//             {linkCalculators.length > 0 && (
//               <div className="hidden md:block relative my-8 sm:my-10">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-800"></div>
//                 </div>
//                 <div className="relative flex justify-center">
//                   <span className="px-4 bg-[#0F172A] text-xs sm:text-sm text-gray-500">More Calculators</span>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* DESKTOP VIEW: Calculator Links List - Remaining calculators (hidden on mobile) */}
//         {linkCalculators.length > 0 && (
//           <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
//             {linkCalculators.map((calc) => (
//               <button
//                 key={calc.id}
//                 onClick={() => router.push(calc.path)}
//                 className="group flex items-center justify-between p-3 sm:p-4 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg"
//               >
//                 <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//                   <span className="text-xl sm:text-2xl flex-shrink-0">{calc.icon || "🧮"}</span>
//                   <div className="text-left min-w-0 flex-1">
//                     <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm truncate">
//                       {calc.name}
//                     </h3>
//                     <p className="text-[10px] sm:text-xs text-gray-500 truncate hidden sm:block">{calc.desc}</p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* MOBILE VIEW: ALL Calculators as Links (2 columns grid) */}
//         {filteredCalculators.length > 0 && (
//           <div className="md:hidden grid grid-cols-2 gap-2">
//             {filteredCalculators.map((calc) => (
//               <button
//                 key={calc.id}
//                 onClick={() => router.push(calc.path)}
//                 className="group flex items-center justify-between p-3 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50"
//               >
//                 <div className="flex items-center gap-2 min-w-0 flex-1">
//                   <span className="text-lg flex-shrink-0">{calc.icon || "🧮"}</span>
//                   <div className="text-left min-w-0 flex-1">
//                     <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs truncate">
//                       {calc.name}
//                     </h3>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* No Results */}
//         {filteredCalculators.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-5xl mb-3">🔍</div>
//             <p className="text-gray-400">No calculators found matching "{searchTerm}"</p>
//             <button
//               onClick={() => handleSearchChange("")}
//               className="mt-3 text-sm text-blue-400 hover:underline"
//             >
//               Clear search
//             </button>
//           </div>
//         )}

//         {/* SEO Content Section */}
//         <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-800">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

//             {/* Left Column */}
//             <div className="text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3">
//               <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Why Use Numrexo Free Online Calculators?</h2>
//               <p>
//                 Numrexo is a <strong className="text-white">free online calculator platform</strong> built for speed, accuracy, and simplicity.
//                 Whether you need to calculate your <strong className="text-white">Body Mass Index (BMI)</strong>, figure out your monthly loan
//                 <strong className="text-white">EMI (Equated Monthly Installment)</strong>, work out a percentage change, or estimate your GST or SIP returns —
//                 Numrexo has a dedicated, purpose-built calculator for every need.
//               </p>
//               <p>
//                 Our <strong className="text-white">BMI Calculator</strong> uses the World Health Organization (WHO) standard formula, giving you
//                 instant insight into whether your weight falls in the healthy range. The <strong className="text-white">EMI Calculator</strong>
//                 applies the standard amortization formula used by banks globally, helping you plan home loans, car loans, or personal loans
//                 with complete transparency.
//               </p>
//               <p>
//                 The <strong className="text-white">Percentage Calculator</strong> handles percentage increase, decrease, and difference in seconds —
//                 perfect for students, teachers, shoppers, and business professionals. The <strong className="text-white">Age Calculator</strong>
//                 gives your exact age in years, months, and days — useful for official documents, medical records, or just satisfying curiosity.
//               </p>
//             </div>

//             {/* Right Column */}
//             <div className="text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3">
//               <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Privacy First & Global Access</h2>
//               <p>
//                 <strong className="text-white">Privacy first:</strong> every calculation happens entirely inside your browser.
//                 Numrexo never stores, logs, or shares your input data. No account, no email, no tracking — just instant answers.
//               </p>
//               <p>
//                 Numrexo works seamlessly on all devices — desktop, tablet, and mobile. There is no app to download.
//                 Open your browser, pick a calculator, enter your values, and get results in under a second.
//               </p>
//               <p>
//                 <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations
//                 happen in your browser — your data stays private and secure.
//               </p>

//               <div className="mt-3 sm:mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
//                 <p className="text-xs text-blue-300/80">
//                   💡 <strong className="text-blue-300">Pro Tip:</strong> Use the search bar above to find any calculator quickly — just type
//                   "BMI", "EMI", "GST", or any calculator name. Bookmark this page for instant access to all tools!
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Internal Links */}
//           <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
//             <p className="flex flex-wrap justify-center gap-1">
//               <span>Popular Calculators:</span>
//               <a href="/health/bmi-calculator" className="text-blue-400 hover:underline">BMI Calculator</a> •
//               <a href="/finance/emi-calculator" className="text-blue-400 hover:underline">EMI Calculator</a> •
//               <a href="/tax/gst-calculator" className="text-blue-400 hover:underline">GST Calculator</a> •
//               <a href="/math/age-calculator" className="text-blue-400 hover:underline">Age Calculator</a> •
//               <a href="/math/percentage-calculator" className="text-blue-400 hover:underline">Percentage Calculator</a> •
//               <a href="/investment/sip-calculator" className="text-blue-400 hover:underline">SIP Calculator</a>
//             </p>
//             <p className="mt-2 text-gray-600 text-[10px] sm:text-[11px]">
//               <span className="text-gray-500">🧮 Free online calculators for every need | </span>
//               <span className="text-gray-500">100% privacy-first | </span>
//               <span className="text-gray-500">No sign-up, no tracking</span>
//             </p>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }








// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Search, ChevronRight } from "lucide-react";
// import CalculatorCard from "@/components/common/CalculatorCard";
// import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";

// export default function CalculatorsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [mounted, setMounted] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const categories = CATEGORIES || {};

//   // Fix: Only run on client side
//   useEffect(() => {
//     setMounted(true);
//     const initialSearch = searchParams.get("search") || "";
//     if (initialSearch) {
//       setSearchTerm(initialSearch);
//     }
//   }, [searchParams]);

//   const filteredCalculators = useMemo(() => {
//     return CALCULATORS_REGISTRY.filter((calc) => {
//       const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         calc.desc.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchTerm, selectedCategory]);

//   const cardCalculators = filteredCalculators.slice(0, 6);
//   const linkCalculators = filteredCalculators.slice(6);

//   const handleSearchChange = (value: string) => {
//     setSearchTerm(value);
//     if (typeof window !== "undefined") {
//       const url = new URL(window.location.href);
//       if (value) {
//         url.searchParams.set("search", value);
//       } else {
//         url.searchParams.delete("search");
//       }
//       router.replace(url.pathname + url.search, { scroll: false });
//     }
//   };

//   // Don't render on server - prevents hydration mismatch
//   if (!mounted) {
//     return (
//       <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-8 sm:mb-10">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Browse All Calculators</h1>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[1, 2, 3, 4, 5, 6].map(i => (
//               <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl h-32 animate-pulse" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 sm:mb-10">
//           <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">All Tools</span>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">Browse All Calculators</h1>
//           <p className="text-gray-400 text-sm sm:text-base">Free, accurate calculators for every need</p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6 sm:mb-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search calculators..."
//               value={searchTerm}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#111827] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors text-sm sm:text-base"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => handleSearchChange("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setSelectedCategory("all")}
//               className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === "all"
//                 ? "bg-blue-500 text-white"
//                 : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
//                 }`}
//             >
//               All
//             </button>
//             {Object.entries(categories).map(([key, cat]: [string, any]) => (
//               <button
//                 key={key}
//                 onClick={() => setSelectedCategory(key)}
//                 className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === key
//                   ? "bg-blue-500 text-white"
//                   : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
//                   }`}
//               >
//                 {cat.icon} {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
//           Found {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? "s" : ""}
//         </div>

//         {/* Desktop Cards */}
//         {cardCalculators.length > 0 && (
//           <>
//             <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {cardCalculators.map((calc) => (
//                 <CalculatorCard
//                   key={calc.id}
//                   calculator={calc}
//                   onClick={() => router.push(calc.path)}
//                 />
//               ))}
//             </div>
//             {linkCalculators.length > 0 && (
//               <div className="hidden md:block relative my-8 sm:my-10">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-800"></div>
//                 </div>
//                 <div className="relative flex justify-center">
//                   <span className="px-4 bg-[#0F172A] text-xs sm:text-sm text-gray-500">More Calculators</span>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* Desktop Links */}
//         {linkCalculators.length > 0 && (
//           <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
//             {linkCalculators.map((calc) => (
//               <button
//                 key={calc.id}
//                 onClick={() => router.push(calc.path)}
//                 className="group flex items-center justify-between p-3 sm:p-4 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg"
//               >
//                 <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//                   <span className="text-xl sm:text-2xl flex-shrink-0">{calc.icon || "🧮"}</span>
//                   <div className="text-left min-w-0 flex-1">
//                     <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm truncate">
//                       {calc.name}
//                     </h3>
//                     <p className="text-[10px] sm:text-xs text-gray-500 truncate hidden sm:block">{calc.desc}</p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Mobile View - All as Links */}
//         {filteredCalculators.length > 0 && (
//           <div className="md:hidden grid grid-cols-2 gap-2">
//             {filteredCalculators.map((calc) => (
//               <button
//                 key={calc.id}
//                 onClick={() => router.push(calc.path)}
//                 className="group flex items-center justify-between p-3 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50"
//               >
//                 <div className="flex items-center gap-2 min-w-0 flex-1">
//                   <span className="text-lg flex-shrink-0">{calc.icon || "🧮"}</span>
//                   <div className="text-left min-w-0 flex-1">
//                     <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs truncate">
//                       {calc.name}
//                     </h3>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
//               </button>
//             ))}
//           </div>
//         )}

//         {filteredCalculators.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-5xl mb-3">🔍</div>
//             <p className="text-gray-400">No calculators found matching "{searchTerm}"</p>
//             <button
//               onClick={() => handleSearchChange("")}
//               className="mt-3 text-sm text-blue-400 hover:underline"
//             >
//               Clear search
//             </button>
//           </div>
//         )}

//         {/* SEO Content - Rest remains same */}
//         <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-800">
//           {/* ... your existing SEO content ... */}
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";

// Force static generation - NO PRERENDERING ERROR
export const dynamic = 'force-static';

export default function CalculatorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = CATEGORIES || {};

  useEffect(() => {
    setMounted(true);
    const initialSearch = searchParams?.get("search") || "";
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [searchParams]);

  const filteredCalculators = useMemo(() => {
    if (!mounted) return [];
    return CALCULATORS_REGISTRY.filter((calc) => {
      const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        calc.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, mounted]);

  const cardCalculators = filteredCalculators.slice(0, 6);
  const linkCalculators = filteredCalculators.slice(6);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set("search", value);
      } else {
        url.searchParams.delete("search");
      }
      router.replace(url.pathname + url.search, { scroll: false });
    }
  };

  // Loading state for build
  if (!mounted) {
    return (
      <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Browse All Calculators</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">All Tools</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">Browse All Calculators</h1>
          <p className="text-gray-400 text-sm sm:text-base">Free, accurate calculators for every need</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#111827] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors text-sm sm:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === "all"
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === key
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
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
          Found {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? "s" : ""}
        </div>

        {/* Desktop Cards */}
        {cardCalculators.length > 0 && (
          <>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cardCalculators.map((calc) => (
                <div
                  key={calc.id}
                  onClick={() => router.push(calc.path)}
                  className="bg-[#111827] border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{calc.icon || "🧮"}</span>
                    <h3 className="font-semibold text-white">{calc.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{calc.desc}</p>
                </div>
              ))}
            </div>
            {linkCalculators.length > 0 && (
              <div className="hidden md:block relative my-8 sm:my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[#0F172A] text-xs sm:text-sm text-gray-500">More Calculators</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Desktop Links */}
        {linkCalculators.length > 0 && (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {linkCalculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => router.push(calc.path)}
                className="group flex items-center justify-between p-3 sm:p-4 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg text-left w-full"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{calc.icon || "🧮"}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm truncate">
                      {calc.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate hidden sm:block">{calc.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Mobile View */}
        {filteredCalculators.length > 0 && (
          <div className="md:hidden grid grid-cols-2 gap-2">
            {filteredCalculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => router.push(calc.path)}
                className="group flex items-center justify-between p-3 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50 text-left w-full"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-lg flex-shrink-0">{calc.icon || "🧮"}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs truncate">
                      {calc.name}
                    </h3>
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-400">No calculators found matching "{searchTerm}"</p>
            <button
              onClick={() => handleSearchChange("")}
              className="mt-3 text-sm text-blue-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}