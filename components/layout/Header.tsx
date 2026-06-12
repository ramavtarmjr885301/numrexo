// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, Calculator } from "lucide-react";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/calculators", label: "Calculators" },
//   { href: "/about", label: "About" },
// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <header className="sticky top-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-lg border-b border-gray-800">
//       <nav className="max-w-6xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
//               <span className="text-white font-bold text-lg">N</span>
//             </div>
//             <span className="text-xl font-extrabold">
//               Num<span className="text-blue-500">rexo</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === link.href
//                   ? "text-blue-400 bg-blue-500/10"
//                   : "text-gray-400 hover:text-white hover:bg-gray-800"
//                   }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-800">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${pathname === link.href
//                   ? "text-blue-400 bg-blue-500/10"
//                   : "text-gray-400 hover:text-white hover:bg-gray-800"
//                   }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }






"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();

  const searchResults = CALCULATORS_REGISTRY.filter((calc) =>
    calc.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-lg border-b border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">N</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold">
              Num<span className="text-blue-500">rexo</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors text-sm"
              />

              {showResults && searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-800">
                        Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                      </div>
                      {searchResults.map((calc) => (
                        <a
                          key={calc.id}
                          href={calc.path}
                          onClick={() => {
                            setSearchTerm("");
                            setShowResults(false);
                          }}
                          className="flex items-center justify-between p-3 hover:bg-[#1A2333] transition-colors no-underline"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{calc.icon || "🧮"}</span>
                            <div>
                              <div className="text-white text-sm font-medium">{calc.name}</div>
                              <div className="text-gray-500 text-xs">{calc.desc}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </a>
                      ))}
                      <a
                        href={`/calculators?search=${encodeURIComponent(searchTerm)}`}
                        onClick={() => {
                          setSearchTerm("");
                          setShowResults(false);
                        }}
                        className="block px-3 py-2 text-center text-sm text-blue-400 hover:bg-[#1A2333] transition-colors border-t border-gray-800"
                      >
                        View all results →
                      </a>
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-gray-400 text-sm">No results for "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === link.href
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3 border-t border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#111827] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-colors text-sm"
            />

            {showResults && searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((calc) => (
                      <a
                        key={calc.id}
                        href={calc.path}
                        onClick={() => {
                          setSearchTerm("");
                          setShowResults(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-[#1A2333] transition-colors no-underline border-b border-gray-700"
                      >
                        <span className="text-xl">{calc.icon || "🧮"}</span>
                        <div>
                          <div className="text-white text-sm font-medium">{calc.name}</div>
                          <div className="text-gray-500 text-xs">{calc.desc}</div>
                        </div>
                      </a>
                    ))}
                    <a
                      href={`/calculators?search=${encodeURIComponent(searchTerm)}`}
                      onClick={() => {
                        setSearchTerm("");
                        setShowResults(false);
                      }}
                      className="block px-3 py-2 text-center text-sm text-blue-400 hover:bg-[#1A2333] transition-colors"
                    >
                      View all results →
                    </a>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-gray-400 text-sm">No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowResults(false);
                  setSearchTerm("");
                }}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${pathname === link.href
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}