"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is carpet area?",
        a: "Carpet area is the actual usable area inside a property where you can lay a carpet. It includes bedrooms, living rooms, kitchen, and bathrooms. It excludes wall thickness, balcony, and common areas.",
    },
    {
        q: "How to calculate carpet area?",
        a: "Carpet Area = Length × Width of each room (sum of all rooms). For irregular shapes, divide into rectangles. Subtract wall thickness (usually 0.5-1 feet) from total built-up area.",
    },
    {
        q: "What is the difference between carpet area, built-up area, and super built-up area?",
        a: "Carpet area = usable area. Built-up area = carpet area + wall thickness. Super built-up area = built-up area + common areas (lobby, stairs, lift). Super built-up is usually 20-30% more than carpet area.",
    },
    {
        q: "Why is carpet area important for buyers?",
        a: "Carpet area is what you actually get to use. RERA (Real Estate Regulatory Authority) mandates that builders must disclose carpet area to protect buyers from inflated super built-up area claims.",
    },
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
    name: "Carpet Area Calculator – Calculate Usable Area",
    description: "Calculate carpet area of your property. Find actual usable area excluding walls. Essential for home buyers and real estate.",
    url: "https://www.numrexo.com/construction/carpet-area-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Carpet area calculation", "Multiple rooms", "Built-up area conversion", "RERA compliant"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Carpet Area Calculator", item: "https://www.numrexo.com/construction/carpet-area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

interface Room {
    id: number;
    length: string;
    width: string;
    name: string;
}

export default function CarpetAreaCalculator() {
    const [rooms, setRooms] = useState<Room[]>([{ id: 1, length: "", width: "", name: "Living Room" }]);
    const [builtUpArea, setBuiltUpArea] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addRoom = () => {
        const newId = Math.max(...rooms.map(r => r.id), 0) + 1;
        setRooms([...rooms, { id: newId, length: "", width: "", name: `Room ${rooms.length + 1}` }]);
    };

    const removeRoom = (id: number) => {
        if (rooms.length > 1) {
            setRooms(rooms.filter(r => r.id !== id));
        }
    };

    const updateRoom = (id: number, field: string, value: string) => {
        setRooms(rooms.map(room => room.id === id ? { ...room, [field]: value } : room));
    };

    const calculate = () => {
        let totalArea = 0;
        let roomDetails: { name: string; area: number }[] = [];

        for (const room of rooms) {
            const length = parseFloat(room.length);
            const width = parseFloat(room.width);
            if (!isNaN(length) && !isNaN(width) && length > 0 && width > 0) {
                const area = length * width;
                totalArea += area;
                roomDetails.push({ name: room.name, area });
            }
        }

        if (totalArea === 0) {
            alert("Please enter valid dimensions for at least one room");
            return;
        }

        const builtUp = parseFloat(builtUpArea);
        let wallArea = 0;
        let superBuiltUpArea = 0;
        let efficiency = 0;

        if (!isNaN(builtUp) && builtUp > 0) {
            wallArea = builtUp - totalArea;
            efficiency = (totalArea / builtUp) * 100;
        } else {
            const estimatedBuiltUp = totalArea * 1.18;
            wallArea = estimatedBuiltUp - totalArea;
            superBuiltUpArea = estimatedBuiltUp * 1.25;
            efficiency = (totalArea / estimatedBuiltUp) * 100;
        }

        setResult({
            carpetArea: totalArea.toFixed(2),
            roomDetails,
            roomCount: rooms.length,
            builtUpArea: builtUp ? builtUp.toFixed(2) : (totalArea * 1.18).toFixed(2),
            wallArea: wallArea.toFixed(2),
            superBuiltUpArea: superBuiltUpArea > 0 ? superBuiltUpArea.toFixed(2) : (totalArea * 1.475).toFixed(2),
            efficiency: efficiency.toFixed(1),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Carpet Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div><h3 className="font-semibold">Room Details</h3><p className="text-xs text-gray-500">Enter dimensions for each room</p></div>
                        <button onClick={addRoom} className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600">+ Add Room</button>
                    </div>
                    <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
                        {rooms.map(room => (
                            <div key={room.id} className="flex flex-wrap gap-2 items-center border-b border-gray-800 pb-3">
                                <input type="text" placeholder="Room name" value={room.name} onChange={(e) => updateRoom(room.id, "name", e.target.value)} className="w-28 px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                <div className="flex-1 relative"><input type="number" step="0.1" placeholder="Length" value={room.length} onChange={(e) => updateRoom(room.id, "length", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span></div>
                                <div className="flex-1 relative"><input type="number" step="0.1" placeholder="Width" value={room.width} onChange={(e) => updateRoom(room.id, "width", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span></div>
                                {rooms.length > 1 && <button onClick={() => removeRoom(room.id)} className="px-2 py-2 text-red-400 hover:text-red-300">✕</button>}
                            </div>
                        ))}
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Built-up Area (Optional)</label><div className="relative"><input type="number" step="0.1" placeholder="Enter if known" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span></div><p className="text-xs text-gray-500 mt-1">If not entered, calculator will estimate</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Calculate Carpet Area →</button>
                    </div>
                </div>

                <ResultBox
                    title="Area Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Add rooms and enter dimensions"
                    mainResult={result ? { label: "Total Carpet Area", value: `${result.carpetArea} sq ft`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        ...result.roomDetails.map((room: any, i: number) => ({ label: `${room.name} Area`, value: `${room.area.toFixed(2)} sq ft` })),
                        { label: "Built-up Area", value: `${result.builtUpArea} sq ft`, valueColor: "text-yellow-400" },
                        { label: "Wall Area", value: `${result.wallArea} sq ft` },
                        { label: "Super Built-up Area (est.)", value: `${result.superBuiltUpArea} sq ft` },
                        { label: "Area Efficiency", value: `${result.efficiency}%` },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Carpet Area Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the actual usable carpet area of your property. Essential for home buyers to verify builder claims and understand what area you'll actually get.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Area Types Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-green-400 mb-2">Carpet Area</h3><p className="text-xs text-gray-400">Actual usable area inside walls. What RERA mandates disclosure of.</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-yellow-400 mb-2">Built-up Area</h3><p className="text-xs text-gray-400">Carpet area + wall thickness (usually 15-20% more).</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-blue-400 mb-2">Super Built-up Area</h3><p className="text-xs text-gray-400">Built-up area + common areas (lobby, stairs, lifts). 25-35% more than carpet area.</p></div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}