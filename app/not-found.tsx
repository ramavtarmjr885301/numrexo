// app/not-found.tsx
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* 404 Number */}
            <div className="relative mb-6">
                <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    404
                </div>
                <div className="absolute -top-4 -right-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>

            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
                The page you are looking for doesn't exist or has been moved to a different URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                    <Home size={18} />
                    Return Home
                </Link>
                <Link
                    href="/calculators"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-blue-500/50 hover:text-blue-400 transition-all"
                >
                    <Search size={18} />
                    Browse Calculators
                </Link>
            </div>

            {/* Suggestions */}
            <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-3">You might be looking for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    <Link href="/health/bmi-calculator" className="text-xs px-3 py-1.5 bg-gray-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition">BMI Calculator</Link>
                    <Link href="/finance/emi-calculator" className="text-xs px-3 py-1.5 bg-gray-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition">EMI Calculator</Link>
                    <Link href="/math/percentage-calculator" className="text-xs px-3 py-1.5 bg-gray-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition">Percentage Calculator</Link>
                    <Link href="/tax/gst-calculator" className="text-xs px-3 py-1.5 bg-gray-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition">GST Calculator</Link>
                </div>
            </div>
        </div>
    );
}