"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  { q: "How is my exact age calculated?", a: "Your exact age is calculated by subtracting your birth date from the current date. The result gives you years, months, and days. We account for leap years and varying month lengths for complete accuracy." },
  { q: "Does the calculator account for leap years?", a: "Yes! Our age calculator automatically accounts for leap years. A leap year adds one extra day (February 29), which affects age calculations for those born on or before February 28." },
  { q: "What is a lunar age?", a: "Lunar age is used in some cultures (especially East Asian). It adds 1 year at birth and another year on Lunar New Year. This calculator shows Western chronological age, which is the international standard." },
  { q: "Why do Koreans calculate age differently?", a: "Traditional Korean age counts the time in the womb as 1 year at birth and adds a year every New Year's Day. South Korea officially switched to international age in 2023, but traditional age is still used culturally." },
];

export default function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    if (isNaN(birthDate.getTime())) { alert("Please enter a valid date"); return; }
    if (birthDate > today) { alert("Birth date cannot be in the future"); return; }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) { months--; const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += lastMonth.getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, daysToNextBirthday });
  };

  const resetForm = () => {
    setDay("");
    setMonth("");
    setYear("");
    setResult(null);
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/math" className="hover:text-gray-300">Math Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">Age Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Birth Date</h3></div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs font-semibold text-gray-400 mb-2">Day</label><input type="number" placeholder="15" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-400 mb-2">Month</label><input type="number" placeholder="6" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-400 mb-2">Year</label><input type="number" placeholder="1990" min="1900" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
            </div>
            <div className="flex gap-3">
              <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Age →</button>
              <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
            </div>
          </div>
        </div>

        <ResultBox
          title="Your Age"
          isEmpty={!result}
          emptyIcon="🎂"
          emptyText="Enter your birth date and press Calculate"
          mainResult={result ? { label: "Your Exact Age", value: `${result.years} years, ${result.months} months, ${result.days} days`, color: "text-pink-400" } : undefined}
          extraRows={result ? [
            { label: "Total Months", value: `${result.totalMonths} months` },
            { label: "Total Weeks", value: `${result.totalWeeks} weeks` },
            { label: "Total Days", value: `${result.totalDays.toLocaleString()} days` },
            { label: "Days Until Next Birthday", value: `${result.daysToNextBirthday} days` },
          ] : undefined}
        />
      </div>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Age Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Our free age calculator tells you exactly how old you are in years, months, and days. Perfect for birthdays, legal documents, medical records, or simply satisfying your curiosity!</p></section>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Age Calculation Formula</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm">Age = Current Date - Birth Date</p><p className="text-gray-500 text-xs mt-2">The calculation accounts for leap years (February 29) and varying month lengths (28-31 days).</p></div></section>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
    </>
  );
}