"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
  {
    q: "What is a healthy BMI range for adults?",
    a: "For adults aged 18–65, a healthy BMI is between 18.5 and 24.9 kg/m². A BMI below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese. Maintaining a healthy BMI reduces the risk of heart disease, type 2 diabetes, and joint problems.",
  },
  {
    q: "Is BMI accurate for athletes and muscular people?",
    a: "No, BMI can be misleading for athletes and highly muscular individuals. Since muscle tissue is denser than fat, a muscular person may show a high BMI despite having very low body fat. In such cases, tools like DEXA scan, body fat percentage measurement, or waist-to-hip ratio offer more accurate health assessments.",
  },
  {
    q: "Is the BMI scale the same for men and women?",
    a: "Yes, the standard WHO BMI scale uses identical ranges for men and women. However, women naturally carry 6–11% more body fat than men at the same BMI. Some clinicians recommend also measuring waist circumference or body fat percentage for a more complete picture of health.",
  },
  {
    q: "What should I do if my BMI is high?",
    a: "If your BMI is 25 or above, consult a healthcare provider for personalised advice. General steps include adopting a calorie-balanced diet rich in vegetables, whole grains, and lean proteins; engaging in at least 150 minutes of moderate aerobic activity per week; improving sleep quality; and managing stress. Small, consistent changes lead to lasting results.",
  },
  {
    q: "How is BMI calculated for children and teenagers?",
    a: "For children and teens aged 2–19, BMI is calculated using the same formula as adults but is interpreted using age- and sex-specific growth charts (CDC or WHO). A BMI at or above the 95th percentile for age and sex is classified as obese in children. Always use a dedicated paediatric BMI calculator for accurate results.",
  },
  {
    q: "Does BMI change with age for older adults?",
    a: "The BMI formula remains the same across age groups, but its interpretation may vary for adults over 65. Older adults tend to lose muscle mass and bone density, so their BMI may appear normal while they carry excess body fat. A BMI of 23–27 is often considered acceptable for seniors, and doctors may recommend body composition testing.",
  },
  {
    q: "What is a healthy BMI for women?",
    a: "For women, a BMI between 18.5 and 24.9 is considered healthy. Women generally have higher body fat percentages than men at the same BMI, so waist circumference (below 35 inches or 88 cm) is also an important health marker. Postmenopausal women are at higher risk of weight gain and should monitor BMI regularly.",
  },
  {
    q: "Can BMI predict disease risk accurately?",
    a: "BMI is a population-level screening tool, not a definitive health diagnostic. High BMI is associated with increased risk of type 2 diabetes, cardiovascular disease, sleep apnea, and certain cancers. However, a person with normal BMI can still have metabolic risk factors. A comprehensive health evaluation includes blood pressure, blood glucose, cholesterol levels, and lifestyle factors.",
  },
  {
    q: "How do I calculate BMI manually without a calculator?",
    a: "In metric units: BMI = Weight (kg) ÷ Height² (m). Example: if you weigh 70 kg and are 1.75 m tall, BMI = 70 ÷ (1.75 × 1.75) = 22.9. In imperial units: BMI = 703 × Weight (lbs) ÷ Height² (inches). Example: 703 × 154 ÷ (69 × 69) = 22.7.",
  },
  {
    q: "What does a BMI of 30 or more mean for your health?",
    a: "A BMI of 30 or above is classified as obesity, divided into Class I (30–34.9), Class II (35–39.9), and Class III (40+, severe obesity). At this level, health risks increase significantly — including a 2–4x higher risk of type 2 diabetes, high blood pressure, heart disease, and sleep apnea. Medical supervision is recommended for weight management.",
  },
];

const BMI_CLASSIFICATIONS = [
  { category: "Severe Thinness", range: "< 16", color: "text-blue-400" },
  { category: "Moderate Thinness", range: "16 – 17", color: "text-blue-400" },
  { category: "Mild Thinness", range: "17 – 18.5", color: "text-blue-300" },
  { category: "Normal", range: "18.5 – 25", color: "text-green-400" },
  { category: "Overweight", range: "25 – 30", color: "text-yellow-400" },
  { category: "Obese Class I", range: "30 – 35", color: "text-orange-400" },
  { category: "Obese Class II", range: "35 – 40", color: "text-red-400" },
  { category: "Obese Class III", range: "> 40", color: "text-red-500" },
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
  name: "BMI Calculator – Free Body Mass Index Calculator",
  description:
    "Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator supporting metric and imperial units for men, women, children, and seniors.",
  url: "https://numrexo.com/health/bmi-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en-US",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Metric and Imperial unit support",
    "BMI category classification",
    "Healthy weight range calculation",
    "Visual BMI gauge",
  ],
  author: {
    "@type": "Organization",
    name: "Numrexo",
    url: "https://numrexo.com",
  },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://numrexo.com/health" },
    { "@type": "ListItem", position: 3, name: "BMI Calculator", item: "https://numrexo.com/health/bmi-calculator" },
  ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    let h: number, w: number;

    if (unit === "metric") {
      h = parseFloat(heightCm) / 100;
      w = parseFloat(weight);
    } else {
      const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      h = totalIn * 0.0254;
      w = parseFloat(weight) * 0.453592;
    }

    if (!h || !w || h <= 0 || w <= 0 || isNaN(h) || isNaN(w)) {
      alert("Please enter valid height and weight values");
      return;
    }

    const bmi = w / (h * h);
    let category: string, colorClass: string;

    if (bmi < 16) { category = "Severe Thinness"; colorClass = "text-blue-400"; }
    else if (bmi < 17) { category = "Moderate Thinness"; colorClass = "text-blue-400"; }
    else if (bmi < 18.5) { category = "Mild Thinness"; colorClass = "text-blue-400"; }
    else if (bmi < 25) { category = "Normal"; colorClass = "text-green-400"; }
    else if (bmi < 30) { category = "Overweight"; colorClass = "text-yellow-400"; }
    else if (bmi < 35) { category = "Obese I"; colorClass = "text-orange-400"; }
    else if (bmi < 40) { category = "Obese II"; colorClass = "text-red-400"; }
    else { category = "Obese III"; colorClass = "text-red-400"; }

    let healthyRange: string;
    if (unit === "metric") {
      const minKg = 18.5 * h * h;
      const maxKg = 25 * h * h;
      healthyRange = `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg`;
    } else {
      const minLbs = (18.5 * h * h) / 0.453592;
      const maxLbs = (25 * h * h) / 0.453592;
      healthyRange = `${minLbs.toFixed(0)} – ${maxLbs.toFixed(0)} lbs`;
    }

    const gaugePos = Math.min(Math.max(((bmi - 10) / 35) * 100, 2), 98);
    setResult({ bmi: bmi.toFixed(1), category, colorClass, healthyRange, gaugePos });
  };

  const resetForm = () => {
    setUnit("metric");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeight("");
    setResult(null);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol
          className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300 transition-colors">
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li className="text-gray-700" aria-hidden="true">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://numrexo.com/health" itemProp="item" className="hover:text-gray-300 transition-colors">
              <span itemProp="name">Health Calculators</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li className="text-gray-700" aria-hidden="true">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-300">BMI Calculator</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-800">
            <button
              className={`flex-1 py-3 text-sm font-semibold transition-all ${unit === "metric"
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-gray-500 hover:text-gray-300"
                }`}
              onClick={() => setUnit("metric")}
            >
              Metric Units
            </button>
            <button
              className={`flex-1 py-3 text-sm font-semibold transition-all ${unit === "imperial"
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-gray-500 hover:text-gray-300"
                }`}
              onClick={() => setUnit("imperial")}
            >
              US / Imperial
            </button>
          </div>

          <div className="p-6 space-y-4">
            {unit === "metric" ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Height (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="170"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Weight (kg)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="5"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="10"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">in</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Weight (lbs)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="160"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">lbs</span>
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Calculate BMI →
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        <ResultBox
          title="Your Result"
          isEmpty={!result}
          emptyIcon="⚖️"
          emptyText="Enter your height and weight, then press Calculate"
          mainResult={
            result
              ? { label: "Your BMI", value: result.bmi, unit: "kg/m²", color: result.colorClass }
              : undefined
          }
          extraRows={
            result
              ? [
                { label: "Category", value: result.category, valueColor: result.colorClass },
                { label: "Healthy Weight Range", value: result.healthyRange },
              ]
              : undefined
          }
        >
          {result && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg transition-all"
                  style={{ left: `${result.gaugePos}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          )}
        </ResultBox>
      </div>

      {/* ── About BMI (SEO Content) ── */}
      <section aria-labelledby="about-bmi" className="mb-8">
        <h2 id="about-bmi" className="text-xl font-semibold text-white mb-3">
          About the BMI Calculator
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          The <strong className="text-gray-300">Body Mass Index (BMI)</strong> is one of the most widely
          used screening tools for assessing healthy body weight relative to height. Developed in the 19th
          century by Belgian mathematician Adolphe Quetelet, BMI provides a quick, free, and non-invasive
          way to estimate whether a person falls in an underweight, normal, overweight, or obese range.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our free BMI calculator supports both{" "}
          <strong className="text-gray-300">metric units</strong> (centimetres and kilograms) and{" "}
          <strong className="text-gray-300">US imperial units</strong> (feet, inches, and pounds), making
          it suitable for users in the United States, United Kingdom, Canada, Australia, and worldwide.
        </p>
      </section>

      {/* ── Formula Section (SEO Content) ── */}
      <section aria-labelledby="bmi-formula" className="mb-8">
        <h2 id="bmi-formula" className="text-xl font-semibold text-white mb-4">
          BMI Formula
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Metric Formula</h3>
            <p className="text-white font-mono text-sm mb-2">BMI = Weight (kg) ÷ Height² (m)</p>
            <p className="text-gray-500 text-xs">
              Example: 70 kg ÷ (1.75 × 1.75) ={" "}
              <span className="text-green-400 font-semibold">22.9</span>
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Imperial Formula</h3>
            <p className="text-white font-mono text-sm mb-2">BMI = 703 × Weight (lbs) ÷ Height² (in)</p>
            <p className="text-gray-500 text-xs">
              Example: 703 × 154 ÷ (69 × 69) ={" "}
              <span className="text-green-400 font-semibold">22.7</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── BMI Classification Table (SEO Content) ── */}
      <section aria-labelledby="bmi-chart" className="mb-8">
        <h2 id="bmi-chart" className="text-xl font-semibold text-white mb-4">
          BMI Classification Chart for Adults
        </h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Classification</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">BMI Range (kg/m²)</th>
              </tr>
            </thead>
            <tbody>
              {BMI_CLASSIFICATIONS.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-800/50 hover:bg-white/5 transition-colors"
                >
                  <td className={`py-3 px-4 font-medium ${row.color}`}>{row.category}</td>
                  <td className="py-3 px-4 text-right text-gray-300">{row.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Source: World Health Organization (WHO) BMI classification standards.
        </p>
      </section>

      {/* ── BMI by Demographics (SEO Content — targets long-tail keywords) ── */}
      <section aria-labelledby="bmi-by-group" className="mb-8">
        <h2 id="bmi-by-group" className="text-xl font-semibold text-white mb-4">
          BMI for Different Groups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">BMI Calculator for Women</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Women naturally carry 6–11% more body fat than men at the same BMI. A healthy BMI range of{" "}
              <span className="text-white font-medium">18.5–24.9</span> applies to women, but waist
              circumference under 35 inches (88 cm) is equally important. Postmenopausal women should
              monitor BMI more frequently due to hormonal fat redistribution.
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">BMI Calculator for Men</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Men typically have higher muscle mass, which can raise BMI without excess fat. A BMI of{" "}
              <span className="text-white font-medium">18.5–24.9</span> is healthy for men. Waist
              circumference over 40 inches (102 cm) signals abdominal obesity risk regardless of overall
              BMI score.
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">BMI for Seniors (65+)</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Older adults often lose muscle mass (sarcopenia), so BMI can underestimate body fat. Many
              doctors consider a BMI of{" "}
              <span className="text-white font-medium">23–27</span> acceptable for those over 65. Body
              composition testing is recommended for a more accurate health assessment in seniors.
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-green-400 mb-2">BMI for Children &amp; Teens</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              For children aged 2–19, BMI is calculated the same way but interpreted using{" "}
              <span className="text-white font-medium">age- and sex-specific percentile charts</span>{" "}
              (CDC growth charts). A BMI at or above the 95th percentile is classified as obese. Use a
              dedicated paediatric BMI calculator for accurate results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Limitations (YMYL trust signal) ── */}
      <section aria-labelledby="bmi-limitations" className="mb-8">
        <h2 id="bmi-limitations" className="text-xl font-semibold text-white mb-3">
          Limitations of BMI
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          While BMI is a useful population-level screening tool, it has important limitations that every
          user should be aware of:
        </p>
        <ul className="space-y-3">
          {[
            {
              title: "Does not measure body fat directly",
              desc: "BMI cannot distinguish between muscle mass and fat mass. A muscular athlete may be classified as overweight despite having very low body fat percentage.",
            },
            {
              title: "Does not account for fat distribution",
              desc: "Abdominal (visceral) fat is more metabolically dangerous than fat stored in the hips or thighs. Waist circumference is a better predictor of cardiovascular risk.",
            },
            {
              title: "Race and ethnicity differences",
              desc: "South Asian and East Asian populations face higher health risks at lower BMI values. The WHO recommends adjusted thresholds for Asian populations (overweight at BMI ≥ 23).",
            },
            {
              title: "Not a standalone diagnostic tool",
              desc: "Always consult a qualified healthcare professional before drawing health conclusions from BMI alone. BMI is a screening metric, not a diagnosis.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-400">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
              <span>
                <strong className="text-gray-300">{item.title} — </strong>
                {item.desc}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ Section (FAQPage schema targets + accordion UX) ── */}
      <section aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-xl font-semibold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-sm font-medium text-gray-200" itemProp="name">
                  {item.q}
                </span>
                <span
                  className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""
                    }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"
                  }`}
              >
                <p
                  className="px-5 text-sm text-gray-400 leading-relaxed"
                  itemProp="text"
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}