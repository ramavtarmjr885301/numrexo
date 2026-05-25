"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      alert("Please enter a valid date");
      return;
    }

    if (birthDate > today) {
      alert("Birth date cannot be in the future");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      daysToNextBirthday,
      birthDate: birthDate.toLocaleDateString("en-IN"),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Birth Date</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Day</label>
              <input
                type="number"
                placeholder="15"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Month</label>
              <input
                type="number"
                placeholder="6"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Year</label>
              <input
                type="number"
                placeholder="1990"
                min="1900"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate Age →
          </button>
        </div>
      </div>

      <ResultBox
        title="Your Age"
        isEmpty={!result}
        emptyIcon="🎂"
        emptyText="Enter your birth date and press Calculate"
        mainResult={result ? {
          label: "Your Exact Age",
          value: `${result.years} years, ${result.months} months, ${result.days} days`,
          color: "text-pink-400",
        } : undefined}
        extraRows={result ? [
          { label: "Total Months", value: `${result.totalMonths} months` },
          { label: "Total Weeks", value: `${result.totalWeeks} weeks` },
          { label: "Total Days", value: `${result.totalDays} days` },
          { label: "Days Until Next Birthday", value: `${result.daysToNextBirthday} days` },
        ] : undefined}
      />
    </div>
  );
}