"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How many MB in a GB?",
        a: "1 GB = 1,024 MB. This is binary calculation used by computers. Some manufacturers use 1 GB = 1,000 MB (decimal), but standard is 1,024.",
    },
    {
        q: "How many KB in a MB?",
        a: "1 MB = 1,024 KB. Similarly, 1 KB = 1,024 bytes. This is based on binary (2^10).",
    },
    {
        q: "What is the difference between MB and MiB?",
        a: "MB (Megabyte) = 1,000,000 bytes (decimal). MiB (Mebibyte) = 1,048,576 bytes (binary). This converter uses binary (1,024) which is standard for computer storage.",
    },
    {
        q: "How many GB in a TB?",
        a: "1 TB = 1,024 GB. Terabytes are used for large storage like hard drives. 1 TB can store approximately 200,000 photos or 500 hours of video.",
    },
    {
        q: "What is the difference between KB and KiB?",
        a: "KB (Kilobyte) = 1,000 bytes (decimal - used by storage manufacturers). KiB (Kibibyte) = 1,024 bytes (binary - used by computers). Our converter uses binary (1,024) which matches how your computer actually measures file sizes.",
    },
    {
        q: "How many bytes in a kilobyte (binary vs decimal)?",
        a: "Binary KB = 1,024 bytes (2^10). Decimal KB = 1,000 bytes (10^3). Windows shows binary (KB = 1,024), while hard drive manufacturers use decimal (1 KB = 1,000 bytes). This explains why your 1TB drive shows only 931GB in Windows.",
    },
    {
        q: "How much data can 1 GB hold?",
        a: "1 GB can hold approximately: 200 songs (MP3, 5MB each), 500 photos (2MB each), 1 hour of HD video, 500 ebooks, or 1,000 app installs. Modern smartphones have 64-512GB storage.",
    },
    {
        q: "What is the difference between MBps and Mbps?",
        a: "MBps = Megabytes per second (file transfer). Mbps = Megabits per second (internet speed). 1 MBps = 8 Mbps. An 100 Mbps internet connection downloads at ~12.5 MB per second. Our converter helps you understand actual download speeds.",
    },
    {
        q: "How to check file sizes on my computer?",
        a: "Windows: Right-click file → Properties. Mac: Cmd+I on file. Linux: ls -lh command. File sizes appear in B, KB, MB, GB. Use our converter to understand what those numbers mean in other units.",
    },
    {
        q: "What is the difference between storage and memory (GB vs RAM)?",
        a: "Storage (SSD/HDD) permanently holds files, photos, apps. RAM temporarily holds what your computer is actively working on. 8GB RAM is typical for multitasking, 256GB-1TB storage typical for files. Our converter works for both types.",
    },
];

const DATA_UNITS = [
    { value: "bit", label: "Bit (b)", toByte: 0.125 },
    { value: "byte", label: "Byte (B)", toByte: 1 },
    { value: "kb", label: "Kilobyte (KB)", toByte: 1024 },
    { value: "mb", label: "Megabyte (MB)", toByte: 1048576 },
    { value: "gb", label: "Gigabyte (GB)", toByte: 1073741824 },
    { value: "tb", label: "Terabyte (TB)", toByte: 1099511627776 },
    { value: "pb", label: "Petabyte (PB)", toByte: 1125899906842624 },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

const FAQ_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
});

const WEBAPP_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Data Converter – Convert Digital Storage Units",
    description: "Convert between bits, bytes, KB, MB, GB, TB, and PB. Perfect for computer storage and data transfer.",
    url: "https://numrexo.com/conversion/data-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 data units", "MB to GB", "KB to MB", "Storage conversions"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Data Converter", item: "https://numrexo.com/conversion/data-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function DataConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("mb");
    const [toUnit, setToUnit] = useState("gb");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = DATA_UNITS.find(u => u.value === fromUnit)!;
        const to = DATA_UNITS.find(u => u.value === toUnit)!;
        const inBytes = val * from.toByte;
        const converted = inBytes / to.toByte;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(6) });
    };

    const swapUnits = () => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); if (value) setTimeout(convert, 10); };

    const resetForm = () => {
        setValue("");
        setFromUnit("mb");
        setToUnit("gb");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Data Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Data Storage Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between digital storage units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{DATA_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{DATA_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={convert} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Convert →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox title="Converted Data" isEmpty={!result} emptyIcon="💾" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-purple-400" } : undefined} extraRows={[]} />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Data Storage Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Data Storage Converter</strong> helps you convert between bits, bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and petabytes (PB). Perfect for computer storage, file sizes, internet speed calculations, and data transfer planning.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding data units is essential in today's digital world. Whether you're buying a new phone, choosing an internet plan, or managing cloud storage, knowing how much data you need saves money and frustration.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Data Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">numeric value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">from unit</strong> (e.g., MB, GB, TB).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">to unit</strong> you want to convert to.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the converted value.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">swap button (🔄)</strong> to quickly reverse the units.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">Reset</strong> to clear all inputs and start a new conversion.</p>
                </div>
            </section>

            {/* Data Units Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Data Storage Units Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Bit & Byte</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Bit (b) is smallest unit (0 or 1). Byte (B) = 8 bits. One character = 1 byte. "Hello" = 5 bytes.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">KB & MB</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Kilobyte (KB) = 1,024 bytes. Megabyte (MB) = 1,024 KB. A 5MB photo = 5 million bytes.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">GB & TB</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Gigabyte (GB) = 1,024 MB. Terabyte (TB) = 1,024 GB. Modern phones have 64-512GB, computers 256GB-2TB.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">PB & Beyond</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Petabyte (PB) = 1,024 TB. Exabyte (EB), Zettabyte (ZB), Yottabyte (YB) are used for data centers and global internet traffic.</p>
                    </div>
                </div>
            </section>

            {/* Why Accurate Data Conversion Matters */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Accurate Data Conversion Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ Storage Buying Decisions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">1TB drive shows 931GB in Windows (binary vs decimal difference). Know what you're actually getting before buying.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Internet Speed Understanding</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">100 Mbps internet = 12.5 MB/s download. Convert correctly to know actual file download times.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2">✓ Cloud Storage Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Google Drive, iCloud, OneDrive show storage in GB/TB. Convert file sizes to know how much space you need.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2">✓ Software Requirements</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Games and apps list storage requirements. Convert between MB/GB to ensure your device has enough space.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Data Usage */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Data Usage Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Activity</th><th className="text-left py-3 px-4 text-gray-400">Typical Size</th><th className="text-left py-3 px-4 text-gray-400">In Other Units</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Text email</td><td className="py-2 px-4">20 KB</td><td className="py-2 px-4 text-yellow-400">0.02 MB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">High-res photo</td><td className="py-2 px-4">5 MB</td><td className="py-2 px-4 text-yellow-400">0.005 GB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">MP3 song (3 min)</td><td className="py-2 px-4">5 MB</td><td className="py-2 px-4 text-yellow-400">0.005 GB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">HD movie (2 hours)</td><td className="py-2 px-4">4 GB</td><td className="py-2 px-4 text-yellow-400">4,096 MB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Video game</td><td className="py-2 px-4">50 GB</td><td className="py-2 px-4 text-yellow-400">0.05 TB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Month of emails</td><td className="py-2 px-4">1 GB</td><td className="py-2 px-4 text-yellow-400">1,024 MB</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Binary vs Decimal */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Binary vs Decimal (Why Your 1TB Drive Shows 931GB)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        <strong className="text-white">Binary (Computers use):</strong> 1 KB = 1,024 bytes, 1 MB = 1,024 KB, 1 GB = 1,024 MB.<br />
                        <strong className="text-white">Decimal (Manufacturers use):</strong> 1 KB = 1,000 bytes, 1 MB = 1,000 KB, 1 GB = 1,000 MB.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        This is why a 1 TB (1,000,000,000,000 bytes) drive shows as 931 GB in Windows (1,000,000,000,000 ÷ 1,073,741,824 = 931 GB). Our converter uses binary (1,024) which matches how your computer actually measures files.
                    </p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Data Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 KB</td><td className="py-2 px-4">Bytes</td><td className="py-2 px-4 text-yellow-400">1,024 bytes</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 MB</td><td className="py-2 px-4">KB</td><td className="py-2 px-4 text-yellow-400">1,024 KB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 GB</td><td className="py-2 px-4">MB</td><td className="py-2 px-4 text-yellow-400">1,024 MB</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 TB</td><td className="py-2 px-4">GB</td><td className="py-2 px-4 text-yellow-400">1,024 GB</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}