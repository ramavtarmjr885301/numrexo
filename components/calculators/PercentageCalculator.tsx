"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

type CalcType = "percentage" | "percentageOf" | "increase" | "decrease";

const FAQ_DATA = [
  { q: "How to calculate percentage of a number?", a: "To find X% of Y, multiply Y by X divided by 100. Example: 20% of 500 = 500 × (20/100) = 100. Our calculator does this instantly for any numbers." },
  { q: "How to calculate percentage increase?", a: "Percentage increase = ((New Value - Original Value) ÷ Original Value) × 100. Example: 50 to 70 = ((70-50)÷50)×100 = 40% increase. Use our Increase mode for instant results." },
  { q: "How to calculate percentage decrease?", a: "Percentage decrease = ((Original Value - New Value) ÷ Original Value) × 100. Example: 80 to 60 = ((80-60)÷80)×100 = 25% decrease. Use our Decrease mode." },
  { q: "How to calculate discount percentage?", a: "Discount % = (Discount Amount ÷ Original Price) × 100. Or use our percentage calculator: enter original price as 'Original' and sale price as 'New' to find discount percentage automatically." },
  { q: "How to convert percentage to decimal?", a: "Divide percentage by 100. Example: 75% = 75 ÷ 100 = 0.75. To convert decimal to percentage, multiply by 100. Example: 0.85 × 100 = 85%. Our calculator shows both decimal and percentage forms." },
  { q: "How to calculate percentage of marks?", a: "Percentage = (Marks Obtained ÷ Total Marks) × 100. Example: 85 out of 100 = (85÷100)×100 = 85%. For multiple subjects: Sum of obtained marks ÷ Sum of total marks × 100. Use our 'is what %' mode." },
  { q: "What is the difference between percentage and percentile?", a: "Percentage is a ratio out of 100 (individual performance). Percentile is rank relative to others (how you compare). Example: 90% = 90/100 correct. 90th percentile = you scored better than 90% of test-takers. Use percentage for scores, percentile for ranking." },
  { q: "How to calculate percentage increase?", a: "Formula: ((New Value - Original Value) ÷ Original Value) × 100. Example: Salary increased from 50,000 to 60,000 = ((60,000-50,000)÷50,000)×100 = 20% increase. Use our Increase mode for instant results." },
  { q: "How to calculate percentage decrease?", a: "Formula: ((Original Value - New Value) ÷ Original Value) × 100. Example: Price dropped from 80 to 60 = ((80-60)÷80)×100 = 25% decrease. Use our Decrease mode with your values." },
  { q: "How to calculate discount percentage?", a: "Discount % = (Discount Amount ÷ Original Price) × 100. Example: Original ₹1,000, Sale ₹800 → Discount = (200÷1000)×100 = 20%. Or use: Discount = (Original - Sale) ÷ Original × 100. Our calculator does this instantly." },
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

  const resetForm = () => {
    setCalcType("percentage");
    setValue1("");
    setValue2("");
    setResult(null);
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
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">{calcType === "percentage" ? "Percentage" : calcType === "percentageOf" ? "First Number" : "Original Value"}</label><input type="number" placeholder={calcType === "percentage" ? "15" : "50"} value={value1} onChange={(e) => setValue1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">{calcType === "percentage" ? "Number" : calcType === "percentageOf" ? "Second Number" : "New Value"}</label><input type="number" placeholder={calcType === "percentage" ? "200" : "200"} value={value2} onChange={(e) => setValue2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
            <div className="flex gap-3">
              <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
              <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
            </div>
          </div>
        </div>
        <ResultBox title="Result" isEmpty={!result} emptyIcon="%" emptyText="Enter values and press Calculate" mainResult={result?.mainResult} extraRows={result?.extraRows} />
      </div>

      {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Percentage Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          The <strong className="text-gray-300">Percentage Calculator</strong> helps you solve everyday percentage problems instantly. Whether you're calculating discounts, tips, tax, grade scores, or percentage increase/decrease, our calculator provides accurate results in seconds.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Free online percentage calculator for all your needs: find percentages, calculate percentage increase/decrease, determine discounts, and solve everyday math problems instantly.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">How to Use This Percentage Calculator</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">calculation type</strong> — % of Number, is what %, % Increase, or % Decrease.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">first number</strong> (percentage, original value, or first number).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">second number</strong> (number, second number, or new value).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate"</strong> to see the result instantly.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Why Use a Percentage Calculator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Quick Shopping Discounts</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Calculate sale prices instantly. Save time and money by knowing exactly what you'll pay after discount.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Grade/Scores Calculation</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Calculate exam percentages, test scores, and overall academic performance accurately.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Business & Finance</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Calculate profit margins, sales growth, tax percentages, and commission rates.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Everyday Math</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Calculate tips at restaurants, tax on purchases, and percentage changes in daily life.</p>
          </div>
        </div>
      </section>

      {/* Percentage Formulas */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Percentage Formulas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Percentage of Number</h3>
            <p className="text-white font-mono text-xs">Result = (Percentage ÷ 100) × Number</p>
            <p className="text-gray-500 text-xs mt-2">Example: 20% of 500 = (20÷100) × 500 = 100</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-green-400 mb-2">Percentage Increase</h3>
            <p className="text-white font-mono text-xs">% Increase = ((New - Original) ÷ Original) × 100</p>
            <p className="text-gray-500 text-xs mt-2">Example: 50 to 70 = ((70-50)÷50)×100 = 40%</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-400 mb-2">Percentage Decrease</h3>
            <p className="text-white font-mono text-xs">% Decrease = ((Original - New) ÷ Original) × 100</p>
            <p className="text-gray-500 text-xs mt-2">Example: 80 to 60 = ((80-60)÷80)×100 = 25%</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">Percentage of a Number</h3>
            <p className="text-white font-mono text-xs">% = (Part ÷ Whole) × 100</p>
            <p className="text-gray-500 text-xs mt-2">Example: 30 is what % of 200? = (30÷200)×100 = 15%</p>
          </div>
        </div>
      </section>

      {/* Real-World Applications */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Real-World Applications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🏷️</div>
            <div className="text-sm font-semibold">Discounts</div>
            <div className="text-xs text-gray-500">Sale price calculation</div>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-semibold">Marks/Grades</div>
            <div className="text-xs text-gray-500">Exam score percentages</div>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-sm font-semibold">Tips & Tax</div>
            <div className="text-xs text-gray-500">Restaurant tips, sales tax</div>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-sm font-semibold">Growth Rate</div>
            <div className="text-xs text-gray-500">Business/Salary increases</div>
          </div>
        </div>
      </section>

      {/* Percentage Calculation Tips */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Percentage Calculation Tips</h2>
        <ul className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">💡</span><span><strong className="text-gray-300">Mental math shortcut:</strong> 10% of any number = move decimal one place left. 20% = double that. 50% = half.</span></li>
          <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">💡</span><span><strong className="text-gray-300">Reverse percentage:</strong> To find original price after discount, divide sale price by (1 - discount%). Example: ₹800 at 20% off = 800 ÷ 0.8 = ₹1000.</span></li>
          <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">💡</span><span><strong className="text-gray-300">Percentage difference:</strong> For comparing two values, use percentage change (increase/decrease). Not percentage points (1 percentage point = 1%).</span></li>
        </ul>
      </section>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Percentage Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed">Free online percentage calculator for all your needs: find percentages, calculate percentage increase/decrease, determine discounts, and solve everyday math problems instantly.</p>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}