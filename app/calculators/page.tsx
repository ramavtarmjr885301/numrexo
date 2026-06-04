// "use client";

// import { useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";
// import CalculatorCard from "@/components/common/CalculatorCard";
// import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";

// export default function CalculatorsPage() {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const filteredCalculators = useMemo(() => {
//     return CALCULATORS_REGISTRY.filter((calc) => {
//       const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         calc.desc.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchTerm, selectedCategory]);

//   return (
//     <section className="px-6 py-12 md:py-16">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">All Tools</span>
//           <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Browse All Calculators</h1>
//           <p className="text-gray-400">Free, accurate calculators for every need</p>
//         </div>

//         {/* Search */}
//         <div className="mb-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search calculators..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors"
//             />
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="mb-8 flex flex-wrap gap-2">
//           <button
//             onClick={() => setSelectedCategory("all")}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === "all"
//               ? "bg-blue-500 text-white"
//               : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
//               }`}
//           >
//             All
//           </button>
//           {Object.entries(CATEGORIES).map(([key, cat]) => (
//             <button
//               key={key}
//               onClick={() => setSelectedCategory(key)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === key
//                 ? "bg-blue-500 text-white"
//                 : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-white"
//                 }`}
//             >
//               {cat.icon} {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="mb-4 text-sm text-gray-500">
//           Found {filteredCalculators.length} calculators
//         </div>

//         {/* Calculator Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCalculators.map((calc) => (
//             <CalculatorCard
//               key={calc.id}
//               calculator={calc}
//               onClick={() => router.push(calc.path)}
//             />
//           ))}
//         </div>

//         {filteredCalculators.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No calculators found. Try a different search term.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }








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

  // Ensure CATEGORIES is defined
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

        {/* Category Filter - Horizontal Scroll for mobile */}
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
      </div>
    </section>
  );
}