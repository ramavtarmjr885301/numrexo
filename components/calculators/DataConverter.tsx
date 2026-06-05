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
    url: "https://www.numrexo.com/conversion/data-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 data units", "MB to GB", "KB to MB", "Storage conversions"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Data Converter", item: "https://www.numrexo.com/conversion/data-converter" },
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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Data Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Data Storage Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between digital storage units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{DATA_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{DATA_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Data" isEmpty={!result} emptyIcon="💾" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-purple-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Data Storage Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between bits, bytes, KB, MB, GB, TB, and PB. Perfect for computer storage, file sizes, and data transfer calculations.</p></section>

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