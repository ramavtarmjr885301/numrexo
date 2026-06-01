"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

type CalcType = "percentage" | "percentageOf" | "increase" | "decrease";

const FAQ_DATA = [
  { q: "How to calculate percentage of a number?", a: "To find X% of Y, multiply Y by X divided by 100. Example: 20% of 500 = 500 × (20/100) = 100. Our calculator does this instantly for any numbers." },
  { q: "How to calculate percentage increase?", a: "Percentage increase = ((New Value - Original Value) ÷ Original Value) × 100. Example: 50 to 70 = ((70-50)÷50)×100 = 40% increase. Use our Increase mode for instant results." },
  { q: "How to calculate percentage decrease?", a: "Percentage decrease = ((Original Value - New Value) ÷ Original Value) × 100. Example: 80 to 60 = ((80-60)÷80)×100 = 25% decrease. Use our Decrease mode." },
  { q: "How to calculate discount percentage?", a: "Discount % = (Discount Amount ÷ Original Price) × 100. Or use our percentage calculator: enter original price as 'Original' and sale price as 'New' to find discount percentage automatically." },
];

const PERCENTAGE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Percentage Calculator – Free Online Percent Tool",
  description: "Calculate percentages, percentage increase/decrease, percentage of a number, and more. Fast, accurate, and free.",
  url: "https://www.numrexo.com/math/percentage-calculator",
  applicationCategory: "MathApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalcType>("percentage");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || (calcType !== "percentage" && isNaN(v2))) {
      alert("Please enter valid numbers");
      return;
    }

    let mainResult = { label: "", value: "", color: "text-blue-400" };
    let extraRows: { label: string; value: string }[] = [];

    switch (calcType) {
      case "percentage":
        if (!isNaN(v2)) {
          const calculated = (v1 / 100) * v2;
          mainResult = { label: `${v1}% of ${v2} =`, value: calculated.toFixed(2), color: "text-blue-400" };
        }
        break;
      case "percentageOf":
        const percent = (v1 / v2) * 100;
        mainResult = { label: `${v1} is what % of ${v2}?`, value: `${percent.toFixed(2)}%`, color: "text-green-400" };
        extraRows = [{ label: "Fraction", value: `${v1}/${v2} = ${(v1 / v2).toFixed(4)}` }];
        break;
      case "increase":
        const increase = ((v2 - v1) / v1) * 100;
        const increaseAmount = v2 - v1;
        mainResult = { label: `Increase from ${v1} to ${v2}`, value: `${increase.toFixed(2)}%`, color: "text-green-400" };
        extraRows = [{ label: "Increase Amount", value: increaseAmount.toFixed(2) }, { label: "Final Value", value: v2.toFixed(2) }];
        break;
      case "decrease":
        const decrease = ((v1 - v2) / v1) * 100;
        const decreaseAmount = v1 - v2;
        mainResult = { label: `Decrease from ${v1} to ${v2}`, value: `${decrease.toFixed(2)}%`, color: "text-red-400" };
        extraRows = [{ label: "Decrease Amount", value: decreaseAmount.toFixed(2) }, { label: "Final Value", value: v2.toFixed(2) }];
        break;
    }

    setResult({ mainResult, extraRows });
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PERCENTAGE_SCHEMA }} />

      <nav className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/math" className="hover:text-gray-300">Math Calculators</a></li><li className="text-gray-700">/</li>
          <li><span className="text-gray-300">Percentage Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Percentage Calculator</h3></div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${calcType === "percentage" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("percentage")}>% of Number</button>
                <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${calcType === "percentageOf" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("percentageOf")}>is what %?</button>
                <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${calcType === "increase" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("increase")}>% Increase</button>
                <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${calcType === "decrease" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("decrease")}>% Decrease</button>
              </div>
            </div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">{calcType === "percentage" ? "Percentage" : calcType === "percentageOf" ? "First Number" : "Original Value"}</label><input type="number" placeholder={calcType === "percentage" ? "15" : "50"} value={value1} onChange={(e) => setValue1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">{calcType === "percentage" ? "Number" : calcType === "percentageOf" ? "Second Number" : "New Value"}</label><input type="number" placeholder={calcType === "percentage" ? "200" : "200"} value={value2} onChange={(e) => setValue2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
            <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
          </div>
        </div>
        <ResultBox title="Result" isEmpty={!result} emptyIcon="%" emptyText="Enter values and press Calculate" mainResult={result?.mainResult} extraRows={result?.extraRows} />
      </div>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Percentage Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Free online percentage calculator for all your needs: find percentages, calculate percentage increase/decrease, determine discounts, and solve everyday math problems instantly.</p></section>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Percentage Formulas</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-blue-400 mb-2">Percentage of Number</h3><p className="text-white font-mono text-xs">Result = (Percentage ÷ 100) × Number</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-green-400 mb-2">Percentage Increase</h3><p className="text-white font-mono text-xs">% Increase = ((New - Original) ÷ Original) × 100</p></div></div></section>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Real-World Applications</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">🏷️</div><div className="text-sm font-semibold">Discounts</div><div className="text-xs text-gray-500">Sale price calculation</div></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">📊</div><div className="text-sm font-semibold">Marks/Grades</div><div className="text-xs text-gray-500">Exam score percentages</div></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">💰</div><div className="text-sm font-semibold">Tips & Tax</div><div className="text-xs text-gray-500">Restaurant tips, sales tax</div></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">📈</div><div className="text-sm font-semibold">Growth Rate</div><div className="text-xs text-gray-500">Business/Salary increases</div></div></div></section>

      <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
    </>
  );
}