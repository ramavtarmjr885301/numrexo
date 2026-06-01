"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  {
    q: "What is a healthy body fat percentage?",
    a: "Healthy body fat ranges differ by gender and age. For men: Essential fat 2-5%, Athletes 6-13%, Fitness 14-17%, Average 18-24%, Obese 25%+. For women: Essential fat 10-13%, Athletes 14-20%, Fitness 21-24%, Average 25-31%, Obese 32%+. Women naturally have higher body fat due to reproductive functions and hormones.",
  },
  {
    q: "How accurate is the US Navy body fat method?",
    a: "The US Navy method is 95-98% accurate compared to hydrostatic weighing when measurements are taken correctly. It's more accurate than BMI and home scales but less accurate than DEXA scans or hydrostatic weighing. Proper measurement technique is crucial—tight tape, no clothing, and consistent positioning.",
  },
  {
    q: "How to measure body fat at home without calipers?",
    a: "The US Navy tape measure method (what our calculator uses) is the most accurate at-home method without calipers. You need only a flexible measuring tape. Alternative methods include: smart scales (uses bioelectrical impedance, accuracy varies), visual comparison charts (estimates), and clothing fit (subjective).",
  },
  {
    q: "What is essential body fat and why is it needed?",
    a: "Essential fat is the minimum fat needed for normal physiological functions: protecting organs, insulating the body, storing energy, and supporting hormone production. For men, essential fat is 2-5%; for women, 10-13% (higher due to reproductive functions and breastfeeding). Dropping below essential fat risks organ failure and hormonal disorders.",
  },
  {
    q: "How does age affect body fat percentage?",
    a: "Body fat naturally increases with age even if weight stays constant. Adults gain 1-2% body fat per decade due to: muscle loss (sarcopenia), hormonal changes (lower testosterone/estrogen), decreased activity levels, and slower metabolism. Healthy body fat ranges adjust upward by 2-3% for each decade after age 30.",
  },
  {
    q: "What's the difference between body fat percentage and BMI?",
    a: "BMI only uses height and weight, unable to distinguish muscle from fat. A muscular athlete may have high BMI but low body fat. Body fat percentage directly measures fat mass vs lean mass, making it more accurate for health assessment. Our calculator provides both metrics for complete health picture.",
  },
  {
    q: "What is visceral fat and why is it dangerous?",
    a: "Visceral fat is fat stored deep in your abdominal cavity, surrounding organs like liver, pancreas, and intestines. It's metabolically active and linked to: heart disease, type 2 diabetes, inflammation, high blood pressure, and certain cancers. Waist circumference over 40 inches (men) or 35 inches (women) indicates high visceral fat.",
  },
  {
    q: "How to reduce body fat percentage effectively?",
    a: "Reduce body fat through: calorie deficit (500-700 daily), high protein intake (1.6-2.2g per kg body weight), strength training 3-4x weekly (preserves muscle), HIIT workouts, 7-9 hours sleep (poor sleep increases fat storage), stress management (cortisol promotes belly fat), and consistency for 8-12 weeks.",
  },
  {
    q: "What is a good body fat percentage for athletes?",
    a: "Athlete ranges: Male athletes 6-13%, Female athletes 14-20%. Specific sports: Bodybuilding (men 4-6%, women 8-12%), Runners (men 8-10%, women 12-15%), Soccer/Football (men 9-12%, women 14-18%), Swimmers (men 10-13%, women 16-20%). Lower body fat doesn't always equal better performance—endurance needs some fat stores.",
  },
  {
    q: "Can body fat percentage be too low?",
    a: "Yes! Dangerously low body fat causes: hormonal disruption (men: low testosterone; women: amenorrhea/lost periods), weakened immune system, fatigue, bone density loss (osteoporosis risk), mood disorders, heart problems, and eating disorders. Never diet below essential fat levels without medical supervision.",
  },
];

const BODY_FAT_TABLE = [
  { category: "Essential Fat (Men/Women)", men: "2-5%", women: "10-13%", color: "text-blue-400" },
  { category: "Athletes", men: "6-13%", women: "14-20%", color: "text-green-400" },
  { category: "Fitness", men: "14-17%", women: "21-24%", color: "text-emerald-400" },
  { category: "Average/Acceptable", men: "18-24%", women: "25-31%", color: "text-yellow-400" },
  { category: "Obese/High Risk", men: "25%+", women: "32%+", color: "text-red-400" },
];

const BODY_FAT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Body Fat Calculator – US Navy Method",
  description: "Calculate your body fat percentage using the US Navy tape measure method. Get accurate results with circumference measurements for men and women.",
  url: "https://www.numrexo.com/fitness/body-fat-calculator",
  applicationCategory: "HealthApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Numrexo" },
});

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    const a = parseFloat(age);

    if (!w || !h || !n || !wa || !a) {
      alert("Please enter all required values (age, weight, height, neck, waist)");
      return;
    }

    let bodyFatPercentage;
    let category = "";
    let colorClass = "";

    if (gender === "male") {
      bodyFatPercentage = 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76;

      if (bodyFatPercentage < 6) { category = "Essential Fat (Athlete)"; colorClass = "text-blue-400"; }
      else if (bodyFatPercentage < 14) { category = "Athlete"; colorClass = "text-green-400"; }
      else if (bodyFatPercentage < 18) { category = "Fitness"; colorClass = "text-emerald-400"; }
      else if (bodyFatPercentage < 25) { category = "Average"; colorClass = "text-yellow-400"; }
      else { category = "Obese (High Risk)"; colorClass = "text-red-400"; }
    } else {
      if (!hi) { alert("Please enter hip measurement for women"); return; }
      bodyFatPercentage = 163.205 * Math.log10(wa + hi - n) - 97.684 * Math.log10(h) - 78.387;

      if (bodyFatPercentage < 14) { category = "Essential Fat (Athlete)"; colorClass = "text-blue-400"; }
      else if (bodyFatPercentage < 21) { category = "Athlete"; colorClass = "text-green-400"; }
      else if (bodyFatPercentage < 25) { category = "Fitness"; colorClass = "text-emerald-400"; }
      else if (bodyFatPercentage < 32) { category = "Average"; colorClass = "text-yellow-400"; }
      else { category = "Obese (High Risk)"; colorClass = "text-red-400"; }
    }

    bodyFatPercentage = Math.max(4, Math.min(50, bodyFatPercentage));
    const leanBodyMass = w * (1 - bodyFatPercentage / 100);
    const bodyFatMass = w * (bodyFatPercentage / 100);
    const bmi = w / ((h / 100) * (h / 100));

    setResult({
      bodyFatPercentage: bodyFatPercentage.toFixed(1),
      category,
      colorClass,
      leanBodyMass: leanBodyMass.toFixed(1),
      bodyFatMass: bodyFatMass.toFixed(1),
      bmi: bmi.toFixed(1),
    });
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BODY_FAT_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/fitness" className="hover:text-gray-300">Fitness Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">Body Fat Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Body Fat Measurements (US Navy Method)</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "male" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setGender("male")}>Male</button>
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "female" ? "bg-pink-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setGender("female")}>Female</button>
              </div>
            </div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Age</label><input type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Weight</label><div className="relative"><input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span></div></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><div className="relative"><input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Neck Circumference</label><div className="relative"><input type="number" placeholder="38" step="0.5" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Waist Circumference</label><div className="relative"><input type="number" placeholder="82" step="0.5" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span><p className="text-xs text-gray-500 mt-1">Measure at belly button level, relaxed</p></div></div>
            {gender === "female" && (<div><label className="block text-xs font-semibold text-gray-400 mb-2">Hip Circumference</label><div className="relative"><input type="number" placeholder="95" step="0.5" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span><p className="text-xs text-gray-500 mt-1">Measure at widest part of hips/buttocks</p></div></div>)}
            <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Body Fat →</button>
          </div>
        </div>

        <ResultBox
          title="Body Fat Analysis"
          isEmpty={!result}
          emptyIcon="📏"
          emptyText="Enter your measurements and press Calculate"
          mainResult={result ? { label: "Body Fat Percentage", value: `${result.bodyFatPercentage}%`, color: result.colorClass } : undefined}
          extraRows={result ? [
            { label: "Category", value: result.category, valueColor: result.colorClass },
            { label: "Lean Body Mass", value: `${result.leanBodyMass} kg` },
            { label: "Body Fat Mass", value: `${result.bodyFatMass} kg` },
            { label: "BMI", value: result.bmi },
          ] : undefined}
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Body Fat Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">The <strong className="text-gray-300">US Navy body fat method</strong> is one of the most accurate at-home body fat measurement techniques. Developed by the Naval Health Research Center, it uses simple circumference measurements to estimate body fat percentage with 95-98% accuracy compared to hydrostatic weighing.</p>
        <p className="text-gray-400 text-sm leading-relaxed">Unlike BMI which can't distinguish muscle from fat, body fat percentage directly measures your body composition. This is crucial for athletes, fitness enthusiasts, and anyone serious about health tracking.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Body Fat Classification Chart</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400">Category</th>
                <th className="text-left py-3 px-4 text-gray-400">Men</th>
                <th className="text-left py-3 px-4 text-gray-400">Women</th>
              </tr>
            </thead>
            <tbody>
              {BODY_FAT_TABLE.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className={`py-3 px-4 font-medium ${row.color}`}>{row.category}</td>
                  <td className="py-3 px-4 text-gray-300">{row.men}</td>
                  <td className="py-3 px-4 text-gray-300">{row.women}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">US Navy Body Fat Formula</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">For Men</h3>
            <p className="text-white font-mono text-xs">% Body Fat = 86.010 × log₁₀(Waist - Neck) - 70.041 × log₁₀(Height) + 36.76</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">For Women</h3>
            <p className="text-white font-mono text-xs">% Body Fat = 163.205 × log₁₀(Waist + Hip - Neck) - 97.684 × log₁₀(Height) - 78.387</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">How to Take Accurate Measurements</h2>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>• <strong>Neck:</strong> Measure just below the Adam's apple (men) or voice box (women), tape sloping slightly downward at front</li>
          <li>• <strong>Waist:</strong> Measure at belly button level (navel), tape snug but not compressing skin, after exhaling normally</li>
          <li>• <strong>Hip (women only):</strong> Measure at widest point of hips/buttocks, tape parallel to floor</li>
          <li>• Use a flexible but non-stretchable measuring tape (cloth or plastic)</li>
          <li>• Take measurements without clothing or over very thin clothing</li>
          <li>• Stand straight, feet together, and relax muscles during measurement</li>
          <li>• Take each measurement twice and average for consistency</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}