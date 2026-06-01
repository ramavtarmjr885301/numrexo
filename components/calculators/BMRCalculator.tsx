"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
  {
    q: "What is BMR and why is it important?",
    a: "Basal Metabolic Rate (BMR) is the number of calories your body burns while at complete rest. It represents the energy needed for vital functions like breathing, circulation, cell production, and temperature regulation. BMR accounts for 60-75% of total daily calorie expenditure. Knowing your BMR helps you determine the minimum calories your body needs and forms the foundation for weight loss, gain, or maintenance plans.",
  },
  {
    q: "How accurate is the BMR formula?",
    a: "The Mifflin-St Jeor equation is considered the most accurate BMR formula for the general population, with a 90-95% accuracy rate. The Harris-Benedict equation (revised) is also reliable but may overestimate calories by 5-10% in some individuals. Both formulas provide estimates; actual metabolic rate can vary based on genetics, body composition, hormones, and health conditions. For precise measurement, indirect calorimetry is required.",
  },
  {
    q: "Why does BMR differ between men and women?",
    a: "Men typically have a higher BMR than women due to greater muscle mass, higher testosterone levels, and larger body size. Muscle tissue burns more calories at rest than fat tissue. On average, a man's BMR is 5-10% higher than a woman's of the same age, weight, and height. Women may experience BMR fluctuations during menstrual cycles and pregnancy.",
  },
  {
    q: "How does age affect BMR?",
    a: "BMR decreases with age primarily due to loss of muscle mass (sarcopenia). After age 20, BMR drops about 1-2% per decade. By age 70, BMR may be 15-20% lower than at age 20. This metabolic slowdown explains why weight management becomes more challenging with age. Regular strength training can partially offset age-related BMR decline.",
  },
  {
    q: "Can I increase my BMR naturally?",
    a: "Yes! Effective strategies include: building muscle mass through strength training (each pound of muscle burns 6-10 calories daily), eating enough protein (thermic effect of food), staying hydrated, getting quality sleep (poor sleep lowers BMR), eating regular meals, drinking green tea or coffee (temporary boost), and avoiding very low-calorie diets which can lower BMR by 15-30%.",
  },
  {
    q: "How to use BMR for weight loss?",
    a: "To lose weight, consume calories between your BMR and Total Daily Energy Expenditure (TDEE). Never eat below your BMR as this triggers starvation mode, lowering metabolism and causing muscle loss. A safe deficit is 300-500 calories below TDEE. Multiply your BMR by an activity factor (1.2 sedentary to 1.9 very active) to get TDEE. Combine diet with exercise for best results.",
  },
  {
    q: "Does BMR affect weight loss plateau?",
    a: "Yes, weight loss plateaus often occur because as you lose weight, your BMR decreases (less body mass to maintain). A 10-15% weight reduction can lower BMR by 5-8%. To break plateaus: increase exercise intensity, add strength training to preserve muscle, recalculate your TDEE, try intermittent fasting, or incorporate refeed days at maintenance calories.",
  },
  {
    q: "What's the difference between BMR and RMR?",
    a: "BMR (Basal Metabolic Rate) is measured under strict conditions: after 8 hours of sleep, 12 hours fasting, and in a dark, temperature-controlled room. RMR (Resting Metabolic Rate) is less restrictive and slightly higher (about 10%). Most calculators and formulas actually estimate RMR, but they're often used interchangeably. For practical purposes, the difference is negligible for weight management.",
  },
  {
    q: "How do medical conditions affect BMR?",
    a: "Several conditions affect BMR: Hypothyroidism can lower BMR by 20-40%, Hyperthyroidism increases BMR by 40-80%, Cushing's syndrome, PCOS (10-15% lower), Diabetes, Heart disease, and Kidney disease. Medications like beta-blockers and steroids can also alter metabolism. If you have any medical condition, consult your doctor for personalized BMR interpretation.",
  },
  {
    q: "Is BMR the same for athletes?",
    a: "Athletes typically have significantly higher BMR than sedentary individuals due to greater muscle mass. A well-trained athlete's BMR can be 15-25% higher than predicted by standard formulas. Bodybuilders may require 30-50% more calories at rest. For athletes, formulas using lean body mass (Katch-McArdle) provide more accurate results than age/weight/height equations.",
  },
];

const BMR_TABLE = [
  { category: "Athlete / Very Low Body Fat", range: "Below 10% (Men), Below 16% (Women)", color: "text-blue-400" },
  { category: "Lean / Fit", range: "10-15% (Men), 16-23% (Women)", color: "text-green-400" },
  { category: "Average / Acceptable", range: "16-23% (Men), 24-31% (Women)", color: "text-yellow-400" },
  { category: "Above Average / Overfat", range: "24-30% (Men), 32-39% (Women)", color: "text-orange-400" },
  { category: "Obese / High Risk", range: "30%+ (Men), 40%+ (Women)", color: "text-red-400" },
];

const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (little or no exercise)", multiplier: 1.2 },
  { value: "light", label: "Lightly Active (light exercise 1-3 days/week)", multiplier: 1.375 },
  { value: "moderate", label: "Moderately Active (moderate exercise 3-5 days/week)", multiplier: 1.55 },
  { value: "active", label: "Very Active (hard exercise 6-7 days/week)", multiplier: 1.725 },
  { value: "extra", label: "Extra Active (physical job + intense daily training)", multiplier: 1.9 },
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
  name: "BMR Calculator – Basal Metabolic Rate Calculator",
  description: "Calculate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor and Harris-Benedict formulas. Get personalized calorie recommendations for weight loss, gain, or maintenance.",
  url: "https://www.numrexo.com/fitness/bmr-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en-US",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["Multiple formulas", "Activity level adjustment", "Calorie recommendations", "Body fat estimation"],
  author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Fitness Calculators", item: "https://www.numrexo.com/fitness" },
    { "@type": "ListItem", position: 3, name: "BMR Calculator", item: "https://www.numrexo.com/fitness/bmr-calculator" },
  ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BMRCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formula, setFormula] = useState<"mifflin" | "harris">("mifflin");

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a || isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) {
      alert("Please enter valid age, weight, and height values");
      return;
    }

    let bmrMifflin, bmrHarris;

    // Mifflin-St Jeor Formula (more accurate for modern populations)
    if (gender === "male") {
      bmrMifflin = 10 * w + 6.25 * h - 5 * a + 5;
      bmrHarris = 66.47 + 13.75 * w + 5.003 * h - 6.755 * a;
    } else {
      bmrMifflin = 10 * w + 6.25 * h - 5 * a - 161;
      bmrHarris = 655.1 + 9.563 * w + 1.85 * h - 4.676 * a;
    }

    const selectedBmr = formula === "mifflin" ? bmrMifflin : bmrHarris;
    const activityMultiplier = ACTIVITY_LEVELS.find(l => l.value === activityLevel)?.multiplier || 1.2;
    const tdee = selectedBmr * activityMultiplier;
    const weightLossCalories = Math.max(selectedBmr, tdee - 500);
    const extremeWeightLoss = Math.max(selectedBmr, tdee - 1000);
    const weightGainCalories = tdee + 500;

    let bodyFatCategory = "";
    let bodyFatColor = "";
    if (gender === "male") {
      const bodyFat = (495 / (1.0324 - 0.19077 * Math.log10(w / (h / 100)) + 0.15456 * Math.log10(a)) - 450);
      if (bodyFat < 10) { bodyFatCategory = "Athlete / Very Low"; bodyFatColor = "text-blue-400"; }
      else if (bodyFat < 16) { bodyFatCategory = "Lean / Fit"; bodyFatColor = "text-green-400"; }
      else if (bodyFat < 24) { bodyFatCategory = "Average / Acceptable"; bodyFatColor = "text-yellow-400"; }
      else if (bodyFat < 30) { bodyFatCategory = "Above Average"; bodyFatColor = "text-orange-400"; }
      else { bodyFatCategory = "Obese / High Risk"; bodyFatColor = "text-red-400"; }
    }

    setResult({
      bmr: Math.round(selectedBmr),
      bmrMifflin: Math.round(bmrMifflin),
      bmrHarris: Math.round(bmrHarris),
      tdee: Math.round(tdee),
      weightLoss: Math.round(weightLossCalories),
      extremeWeightLoss: Math.round(extremeWeightLoss),
      weightGain: Math.round(weightGainCalories),
      activityLevel: ACTIVITY_LEVELS.find(l => l.value === activityLevel)?.label,
      formula,
      bodyFatCategory,
      bodyFatColor,
    });
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300 transition-colors">
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li className="text-gray-700">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://www.numrexo.com/fitness" itemProp="item" className="hover:text-gray-300 transition-colors">
              <span itemProp="name">Fitness Calculators</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li className="text-gray-700">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-300">BMR Calculator</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Personal Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "male" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                  onClick={() => setGender("male")}
                >
                  Male
                </button>
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "female" ? "bg-pink-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                  onClick={() => setGender("female")}
                >
                  Female
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Age</label>
              <div className="relative">
                <input type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Weight</label>
              <div className="relative">
                <input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
              <div className="relative">
                <input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Activity Level</label>
              <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">
                {ACTIVITY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Formula</label>
              <div className="grid grid-cols-2 gap-3">
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${formula === "mifflin" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setFormula("mifflin")}>
                  Mifflin-St Jeor
                </button>
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${formula === "harris" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setFormula("harris")}>
                  Harris-Benedict
                </button>
              </div>
            </div>
            <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg transition-all">
              Calculate BMR →
            </button>
          </div>
        </div>

        {/* Result */}
        <ResultBox
          title="Your Results"
          isEmpty={!result}
          emptyIcon="🔥"
          emptyText="Enter your details and press Calculate"
          mainResult={result ? { label: "Basal Metabolic Rate", value: `${result.bmr} calories/day`, color: "text-red-400" } : undefined}
          extraRows={result ? [
            { label: "Total Daily Energy Expenditure", value: `${result.tdee} calories/day`, valueColor: "text-yellow-400" },
            { label: "For Weight Loss", value: `${result.weightLoss} calories/day` },
            { label: "For Extreme Weight Loss", value: `${result.extremeWeightLoss} calories/day`, valueColor: "text-orange-400" },
            { label: "For Weight Gain", value: `${result.weightGain} calories/day`, valueColor: "text-green-400" },
          ] : undefined}
        />
      </div>

      {/* About BMR Section */}
      <section aria-labelledby="about-bmr" className="mb-8">
        <h2 id="about-bmr" className="text-xl font-semibold text-white mb-3">About the BMR Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          The <strong className="text-gray-300">Basal Metabolic Rate (BMR)</strong> represents the number of calories your body burns at complete rest—just to keep your heart beating, lungs breathing, and organs functioning. It's the foundation of any weight management plan.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our BMR calculator uses both the <strong className="text-gray-300">Mifflin-St Jeor</strong> and <strong className="text-gray-300">Harris-Benedict</strong> formulas, widely considered the most accurate for estimating resting metabolic rate. We also calculate your Total Daily Energy Expenditure (TDEE) based on your activity level.
        </p>
      </section>

      {/* Formula Section */}
      <section aria-labelledby="bmr-formula" className="mb-8">
        <h2 id="bmr-formula" className="text-xl font-semibold text-white mb-4">BMR Formulas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Mifflin-St Jeor (1990)</h3>
            <p className="text-white font-mono text-xs mb-2">Men: BMR = 10×W + 6.25×H - 5×A + 5</p>
            <p className="text-white font-mono text-xs mb-2">Women: BMR = 10×W + 6.25×H - 5×A - 161</p>
            <p className="text-gray-500 text-xs">Considered most accurate for the general population (within 90-95% of measured RMR).</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Harris-Benedict (Revised 1984)</h3>
            <p className="text-white font-mono text-xs mb-2">Men: BMR = 88.362 + 13.397×W + 4.799×H - 5.677×A</p>
            <p className="text-white font-mono text-xs mb-2">Women: BMR = 447.593 + 9.247×W + 3.098×H - 4.330×A</p>
            <p className="text-gray-500 text-xs">Widely used historical formula with reliable results.</p>
          </div>
        </div>
      </section>

      {/* Activity Level Table */}
      <section aria-labelledby="activity-table" className="mb-8">
        <h2 id="activity-table" className="text-xl font-semibold text-white mb-4">Activity Level Multipliers (TDEE)</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Activity Level</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY_LEVELS.map((level, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className="py-3 px-4 text-gray-300">{level.label}</td>
                  <td className="py-3 px-4 text-right text-gray-400">{level.multiplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
              </div>
              {openFaq !== i && (<span className="sr-only" itemProp="text">{item.a}</span>)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}