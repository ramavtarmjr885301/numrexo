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
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        All Tools
                    </span>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-3">
                        Browse All Calculators
                    </h1>

                    <p className="text-ink-faint text-sm sm:text-base">
                        Free, accurate calculators for every need
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6 sm:mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />

                        <input
                            type="text"
                            placeholder="Search calculators..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-surface border border-hairline rounded-xl text-ink placeholder-gray-500 focus:border-blue-600 outline-none transition-colors text-sm sm:text-base"
                        />

                        {searchTerm && (
                            <button
                                onClick={() => handleSearchChange("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-soft"
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
                                ? "bg-blue-600 text-white"
                                : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                }`}
                        >
                            All
                        </button>

                        {Object.entries(categories).map(([key, cat]: [string, any]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === key
                                    ? "bg-blue-600 text-white"
                                    : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                    }`}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-ink-faint">
                    Found {filteredCalculators.length} calculator
                    {filteredCalculators.length !== 1 ? "s" : ""}
                </div>

                {/* One responsive list. (It used to render a desktop copy and a
                    mobile copy hidden by CSS - crawlers read both, so every
                    calculator appeared twice in the page HTML.) */}
                {filteredCalculators.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0">
                        {filteredCalculators.map((calc) => (
                            <li key={calc.id}>
                                <a
                                    href={calc.path}
                                    onClick={(e) => {
                                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                                        e.preventDefault();
                                        router.push(calc.path);
                                    }}
                                    className="group flex items-start gap-3 p-4 h-full bg-surface border border-hairline rounded-xl transition-all duration-200 hover:border-blue-300 hover:bg-cream"
                                >
                                    <span className="text-2xl flex-shrink-0">{calc.icon || "🧮"}</span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-semibold text-ink group-hover:text-blue-600 transition-colors text-sm">
                                            {calc.name}
                                        </span>
                                        <span className="block text-xs text-ink-faint mt-1">
                                            {calc.desc}
                                        </span>
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-ink-faint group-hover:text-blue-600 transition-all flex-shrink-0 mt-1" />
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {filteredCalculators.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-3">🔍</div>

                        <p className="text-ink-faint">
                            No calculators found matching "{searchTerm}"
                        </p>

                        <button
                            onClick={() => handleSearchChange("")}
                            className="mt-3 text-sm text-blue-600 hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}