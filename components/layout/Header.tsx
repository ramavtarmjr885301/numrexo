"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calculator } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-lg border-b border-gray-800">
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-extrabold">
              Num<span className="text-blue-500">rexo</span>
            </span>
          </Link>

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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
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








// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { Menu, X, Search, ArrowRight } from "lucide-react";
// import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/calculators", label: "Calculators" },
//   { href: "/about", label: "About" },
// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchRef = useRef<HTMLDivElement>(null);

//   // Handle search
//   useEffect(() => {
//     if (searchTerm.length > 1) {
//       const results = CALCULATORS_REGISTRY.filter((calc) =>
//         calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         calc.desc.toLowerCase().includes(searchTerm.toLowerCase())
//       ).slice(0, 8);
//       setSearchResults(results);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   // Close search when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setSearchOpen(false);
//         setSearchTerm("");
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       router.push(`/calculators?search=${encodeURIComponent(searchTerm)}`);
//       setSearchOpen(false);
//       setSearchTerm("");
//     }
//   };

//   const handleResultClick = (path: string) => {
//     console.log("=== DEBUG ===");
//     console.log("Path received:", path);
//     console.log("Path type:", typeof path);
//     console.log("Path length:", path?.length);

//     if (path && path.startsWith('/')) {
//       console.log("✅ Valid path, navigating to:", path);
//       // Use window.location for reliable navigation
//       window.location.href = path;
//     } else {
//       console.log("❌ Invalid path:", path);
//       alert(`Cannot navigate to: ${path}`);
//     }

//     setSearchOpen(false);
//     setSearchTerm("");
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-lg border-b border-gray-800">
//       <nav className="max-w-6xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16 gap-4">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 flex-shrink-0">
//             <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
//               <span className="text-white font-bold text-lg">N</span>
//             </div>
//             <span className="text-xl font-extrabold hidden sm:inline">
//               Num<span className="text-blue-500">rexo</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation + Search */}
//           <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
//             {/* Search Bar - Desktop */}
//             <div className="relative flex-1 max-w-md" ref={searchRef}>
//               <form onSubmit={handleSearch}>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="Search calculators..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onFocus={() => setSearchOpen(true)}
//                     className="w-full pl-9 pr-4 py-2 bg-[#1a1f2e] border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-blue-500 outline-none transition-colors"
//                   />
//                 </div>
//               </form>

//               {/* Search Results Dropdown */}
//               {searchOpen && searchResults.length > 0 && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
//                   {searchResults.map((result) => (
//                     <button
//                       key={result.id}
//                       onClick={() => handleResultClick(result.path)}
//                       className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors flex items-center gap-3 border-b border-gray-800 last:border-0"
//                     >
//                       <span className="text-2xl">{result.icon}</span>
//                       <div className="flex-1">
//                         <div className="font-medium text-white text-sm">{result.name}</div>
//                         <div className="text-xs text-gray-500">{result.desc.slice(0, 60)}...</div>
//                       </div>
//                       <ArrowRight size={14} className="text-gray-600" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Navigation Links */}
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

//           {/* Mobile: Search Icon + Menu Button */}
//           <div className="flex items-center gap-2 md:hidden">
//             {/* Search Icon - Mobile */}
//             <button
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
//             >
//               <Search size={20} />
//             </button>

//             {/* Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar (Expandable) */}
//         {searchOpen && (
//           <div className="md:hidden py-4 border-t border-gray-800" ref={searchRef}>
//             <form onSubmit={handleSearch}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search calculators..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   autoFocus
//                   className="w-full pl-9 pr-4 py-3 bg-[#1a1f2e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 outline-none"
//                 />
//               </div>
//             </form>

//             {/* Mobile Search Results */}
//             {searchResults.length > 0 && (
//               <div className="mt-3 space-y-2 max-h-96 overflow-y-auto">
//                 {searchResults.map((result) => (
//                   <button
//                     key={result.id}
//                     onClick={() => handleResultClick(result.path)}
//                     className="w-full text-left px-3 py-2 bg-[#1a1f2e] rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-3"
//                   >
//                     <span className="text-xl">{result.icon}</span>
//                     <div className="flex-1">
//                       <div className="font-medium text-white text-sm">{result.name}</div>
//                       <div className="text-xs text-gray-500">{result.desc.slice(0, 50)}...</div>
//                     </div>
//                     <ArrowRight size={14} className="text-gray-600" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Mobile Navigation Menu */}
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