// app/blog/loading.tsx

export default function BlogLoading() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="animate-pulse">
                {/* Header skeleton */}
                <div className="h-12 w-64 bg-gray-700 rounded mb-4"></div>
                <div className="h-6 w-96 bg-gray-700 rounded mb-8"></div>

                {/* Category filter skeleton */}
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-16 bg-gray-700 rounded-full"></div>
                    ))}
                </div>

                {/* Blog grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <div className="h-48 bg-gray-700"></div>
                            <div className="p-4">
                                <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}