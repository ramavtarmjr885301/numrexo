"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { CALCULATORS_REGISTRY, CATEGORIES } from "@/data/calculatorsRegistry";

interface Props {
    initialSearch: string;
}

export default function CalculatorsClient({
    initialSearch,
}: Props) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = CATEGORIES || {};

    const filteredCalculators = useMemo(() => {
        return CALCULATORS_REGISTRY.filter((calc) => {
            const matchesSearch =
                calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                calc.desc.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                calc.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const cardCalculators = filteredCalculators.slice(0, 6);
    const linkCalculators = filteredCalculators.slice(6);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);

        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        const query = params.toString();

        router.replace(
            query ? `?${query}` : "/calculators",
            { scroll: false }
        );
    };

    return (
        <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-10">
                    <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                        All Tools
                    </span>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">
                        Browse All Calculators
                    </h1>

                    <p className="text-gray-400 text-sm sm:text-base">
                        Free, accurate calculators for every need
                    </p>
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

                {/* Categories */}
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
                    Found {filteredCalculators.length} calculator
                    {filteredCalculators.length !== 1 ? "s" : ""}
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

                                        <h3 className="font-semibold text-white">
                                            {calc.name}
                                        </h3>
                                    </div>

                                    <p className="text-gray-400 text-sm">
                                        {calc.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {linkCalculators.length > 0 && (
                            <div className="hidden md:block relative my-8 sm:my-10">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-800"></div>
                                </div>

                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-[#0F172A] text-xs sm:text-sm text-gray-500">
                                        More Calculators
                                    </span>
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
                                className="group flex items-center justify-between p-3 sm:p-4 bg-[#111827] hover:bg-[#1A2333] border border-gray-800 rounded-xl transition-all duration-200 hover:border-blue-500/50 text-left w-full"
                            >
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                    <span className="text-xl sm:text-2xl flex-shrink-0">
                                        {calc.icon || "🧮"}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm truncate">
                                            {calc.name}
                                        </h3>

                                        <p className="text-[10px] sm:text-xs text-gray-500 truncate hidden sm:block">
                                            {calc.desc}
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Mobile */}
                {filteredCalculators.length > 0 && (
                    <div className="md:hidden grid grid-cols-2 gap-2">
                        {filteredCalculators.map((calc) => (
                            <button
                                key={calc.id}
                                onClick={() => router.push(calc.path)}
                                className="group flex items-center justify-between p-3 bg-[#111827] border border-gray-800 rounded-xl text-left"
                            >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className="text-lg">{calc.icon || "🧮"}</span>

                                    <h3 className="font-medium text-white text-xs truncate">
                                        {calc.name}
                                    </h3>
                                </div>

                                <ChevronRight className="w-3 h-3 text-gray-600" />
                            </button>
                        ))}
                    </div>
                )}

                {filteredCalculators.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-3">🔍</div>

                        <p className="text-gray-400">
                            No calculators found matching "{searchTerm}"
                        </p>

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