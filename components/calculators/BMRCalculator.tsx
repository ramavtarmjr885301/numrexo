"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
  {
    q: "What is BMR and why does it matter for weight management?",
    a: "Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest — just to keep essential functions running: your heart beating, lungs breathing, kidneys filtering, and cells repairing themselves. It accounts for 60–75% of everything you burn in a day. Most people are surprised to learn that simply existing burns the majority of their daily calories. Understanding your BMR means you finally know the baseline your body actually needs — and that's the first, most important step toward any successful weight loss, muscle gain, or maintenance plan. Without this number, calorie goals are just guesswork.",
  },
  {
    q: "Which BMR formula is more accurate — Mifflin-St Jeor or Harris-Benedict?",
    a: "For most people, the Mifflin-St Jeor equation (developed in 1990) is the more accurate choice. Multiple validation studies have shown it estimates resting metabolic rate within 90–95% accuracy for the general population. The revised Harris-Benedict formula (1984) is also widely trusted but tends to overestimate calorie needs by 5–10% in some individuals — which might not sound like much, but across weeks of dieting, it adds up. That said, both are mathematical estimates. Your true metabolic rate depends on genetics, hormone levels, body composition, and even gut microbiome health. For laboratory-grade precision, indirect calorimetry is the gold standard — but for everyday planning, either formula works well.",
  },
  {
    q: "Why is a man's BMR typically higher than a woman's?",
    a: "The primary reason comes down to body composition, not biology alone. Men generally carry more muscle mass than women, and muscle is metabolically expensive tissue — it burns roughly 6 calories per pound per day even at rest, compared to about 2 calories per pound for fat tissue. Higher testosterone levels in men further support muscle retention and growth. On average, a man's BMR runs 5–10% higher than a woman's of the same age, height, and weight. For women, BMR can also fluctuate throughout the menstrual cycle — slightly elevated during the luteal phase — and drops more significantly during and after menopause as estrogen levels decline.",
  },
  {
    q: "How does age affect BMR, and can you slow the decline?",
    a: "After age 20, BMR tends to decline at roughly 1–2% per decade, primarily because most people gradually lose muscle mass — a process called sarcopenia. By age 70, your resting metabolism may be 15–20% lower than it was in your twenties. This is why the same eating habits that kept you lean at 25 can lead to gradual weight gain by 45. The good news: the decline is largely driven by muscle loss, not age itself. Regular strength training — even two sessions per week — can substantially preserve muscle mass and keep BMR elevated. Adequate protein intake (0.7–1g per pound of body weight), quality sleep, and avoiding prolonged very-low-calorie diets all help protect your metabolic rate as you age.",
  },
  {
    q: "How do I use my BMR result to actually lose weight?",
    a: "Your BMR is the starting point, not the finish line. To get your real daily calorie target, multiply your BMR by the appropriate activity multiplier to find your TDEE (Total Daily Energy Expenditure). For weight loss, create a calorie deficit from your TDEE — not from your BMR. A moderate deficit of 300–500 calories per day leads to roughly 0.5–1 lb of fat loss per week, which is sustainable and preserves muscle. Never consistently eat below your BMR: doing so signals your body that food is scarce, which triggers metabolic adaptation — your body lowers its BMR by 15–30% to compensate. This is exactly why extreme crash diets backfire. Pair a moderate deficit with strength training for best long-term results.",
  },
  {
    q: "What causes a weight loss plateau, and how does BMR play a role?",
    a: "Plateaus are frustrating, but they're actually your body working exactly as designed. As you lose weight, your body literally becomes smaller — and a smaller body has lower energy needs, so your BMR drops. A 10–15% reduction in body weight can lower BMR by 5–8%, meaning the calorie deficit that once worked no longer exists. Additionally, your body becomes more efficient at the activities you regularly perform. To break through: recalculate your TDEE at your new weight, incorporate progressive strength training to rebuild or maintain muscle, consider a 1–2 week 'diet break' at maintenance calories to reset metabolic hormones like leptin, and vary your exercise routine to prevent adaptation.",
  },
  {
    q: "What is the difference between BMR and RMR?",
    a: "These two terms are often used interchangeably, but they're not quite the same thing. BMR (Basal Metabolic Rate) is measured under very strict clinical conditions: after a full night of sleep, a 12-hour fast, lying still in a dark, temperature-controlled room. RMR (Resting Metabolic Rate) has fewer restrictions — it's measured after a few hours of rest and light fasting. RMR typically runs about 10% higher than true BMR. In practice, most online calculators — including this one — actually estimate RMR, though they label it as BMR. For everyday weight management purposes, the difference is small enough to be negligible. Just stay consistent: use the same formula and same assumptions each time you recalculate.",
  },
  {
    q: "How do medical conditions affect BMR?",
    a: "Several health conditions can meaningfully shift your metabolic rate, which is why medical supervision matters if your results don't match your experience. Hypothyroidism (underactive thyroid) is one of the most common culprits — it can reduce BMR by 20–40%, making weight gain easy and weight loss frustratingly slow. Hyperthyroidism has the opposite effect, pushing BMR up by 40–80%, causing unexplained weight loss. Other conditions that lower BMR include PCOS (polycystic ovary syndrome, roughly 10–15% reduction), Cushing's syndrome, and chronic kidney disease. Medications also play a role — beta-blockers, certain antidepressants, and corticosteroids can all slow metabolism. If your calculated BMR seems wildly off from your real-world experience, a thyroid panel and metabolic workup with your doctor is worth pursuing.",
  },
  {
    q: "Is BMR the same for athletes and highly muscular people?",
    a: "Not at all — and this is one of the most practically important nuances of metabolic calculations. Athletes and highly muscular individuals have substantially more metabolically active tissue, which drives BMR significantly higher than standard formulas predict. A well-trained endurance or strength athlete's true BMR can run 15–25% above formula estimates. Elite bodybuilders may need 30–50% more calories at rest than their age/weight/height alone would suggest. For athletes, the Katch-McArdle formula — which uses lean body mass rather than total body weight — provides considerably more accurate estimates. If you're athletic or have above-average muscle mass, treat the standard BMR calculation as a conservative floor, not a precise target.",
  },
  {
    q: "Can I increase my BMR naturally without supplements?",
    a: "Yes, and the most effective strategies are probably simpler than you expect. Building muscle through progressive strength training is the single highest-impact approach: each additional pound of muscle increases your resting calorie burn. Eating adequate protein has a powerful thermic effect — your body burns 20–30% of protein calories just through digestion, compared to 5–10% for carbohydrates and 0–3% for fats. Quality sleep is underrated — poor sleep reduces BMR and elevates cortisol, which promotes fat storage. Staying well hydrated supports enzyme function across every metabolic pathway. Consistent meal timing (avoiding prolonged fasting followed by large meals) helps keep metabolic rate steady. What doesn't work long-term: crash diets, extreme restriction, and most 'metabolism-boosting' supplements — the effect is either negligible or temporary.",
  },
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
  name: "BMR Calculator – Basal Metabolic Rate & TDEE Calculator",
  description:
    "Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor and Harris-Benedict formulas. Get science-backed calorie targets for weight loss, muscle gain, or maintenance.",
  url: "https://numrexo.com/fitness/bmr-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en-US",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Mifflin-St Jeor formula",
    "Harris-Benedict formula",
    "Activity level TDEE adjustment",
    "Weight loss & weight gain calorie targets",
    "Extreme weight loss safety check",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://numrexo.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Fitness Calculators",
      item: "https://numrexo.com/fitness",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "BMR Calculator",
      item: "https://numrexo.com/fitness/bmr-calculator",
    },
  ],
});

const ARTICLE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BMR Calculator – How to Calculate Your Basal Metabolic Rate",
  description:
    "A complete guide to understanding and calculating Basal Metabolic Rate (BMR). Covers Mifflin-St Jeor and Harris-Benedict formulas, TDEE, activity multipliers, and calorie strategies for weight loss or gain.",
  url: "https://numrexo.com/fitness/bmr-calculator",
  author: {
    "@type": "Organization",
    name: "Numrexo",
    url: "https://numrexo.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Numrexo",
    url: "https://numrexo.com",
  },
  inLanguage: "en-US",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://numrexo.com/fitness/bmr-calculator",
  },
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

    if (
      !w ||
      !h ||
      !a ||
      isNaN(w) ||
      isNaN(h) ||
      isNaN(a) ||
      w <= 0 ||
      h <= 0 ||
      a <= 0
    ) {
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
    const activityMultiplier =
      ACTIVITY_LEVELS.find((l) => l.value === activityLevel)?.multiplier ||
      1.2;
    const tdee = selectedBmr * activityMultiplier;
    const weightLossCalories = Math.max(selectedBmr, tdee - 500);
    const extremeWeightLoss = Math.max(selectedBmr, tdee - 1000);
    const weightGainCalories = tdee + 500;

    let bodyFatCategory = "";
    let bodyFatColor = "";
    if (gender === "male") {
      const bodyFat =
        495 /
        (1.0324 -
          0.19077 * Math.log10(w / (h / 100)) +
          0.15456 * Math.log10(a)) -
        450;
      if (bodyFat < 10) {
        bodyFatCategory = "Athlete / Very Low";
        bodyFatColor = "text-blue-400";
      } else if (bodyFat < 16) {
        bodyFatCategory = "Lean / Fit";
        bodyFatColor = "text-green-400";
      } else if (bodyFat < 24) {
        bodyFatCategory = "Average / Acceptable";
        bodyFatColor = "text-yellow-400";
      } else if (bodyFat < 30) {
        bodyFatCategory = "Above Average";
        bodyFatColor = "text-orange-400";
      } else {
        bodyFatCategory = "Obese / High Risk";
        bodyFatColor = "text-red-400";
      }
    }

    setResult({
      bmr: Math.round(selectedBmr),
      bmrMifflin: Math.round(bmrMifflin),
      bmrHarris: Math.round(bmrHarris),
      tdee: Math.round(tdee),
      weightLoss: Math.round(weightLossCalories),
      extremeWeightLoss: Math.round(extremeWeightLoss),
      weightGain: Math.round(weightGainCalories),
      activityLevel: ACTIVITY_LEVELS.find((l) => l.value === activityLevel)
        ?.label,
      formula,
      bodyFatCategory,
      bodyFatColor,
    });
  };

  return (
    <>
      {/* ── JSON-LD Schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }}
      />

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol
          className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            <a
              href="https://numrexo.com"
              itemProp="item"
              className="hover:text-gray-300 transition-colors"
            >
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li className="text-gray-700">/</li>
          <li
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            <a
              href="https://numrexo.com/fitness"
              itemProp="item"
              className="hover:text-gray-300 transition-colors"
            >
              <span itemProp="name">Fitness Calculators</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li className="text-gray-700">/</li>
          <li
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name" className="text-gray-300">
              BMR Calculator
            </span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* ── Calculator Grid (UNCHANGED) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Personal Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "male"
                      ? "bg-blue-500 text-white"
                      : "bg-[#0f1525] border border-gray-700"
                    }`}
                  onClick={() => setGender("male")}
                >
                  Male
                </button>
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "female"
                      ? "bg-pink-500 text-white"
                      : "bg-[#0f1525] border border-gray-700"
                    }`}
                  onClick={() => setGender("female")}
                >
                  Female
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  years
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Weight
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  kg
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Height
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  cm
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {ACTIVITY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Formula
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${formula === "mifflin"
                      ? "bg-blue-500 text-white"
                      : "bg-[#0f1525] border border-gray-700"
                    }`}
                  onClick={() => setFormula("mifflin")}
                >
                  Mifflin-St Jeor
                </button>
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${formula === "harris"
                      ? "bg-blue-500 text-white"
                      : "bg-[#0f1525] border border-gray-700"
                    }`}
                  onClick={() => setFormula("harris")}
                >
                  Harris-Benedict
                </button>
              </div>
            </div>
            <button
              onClick={calculate}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg transition-all"
            >
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
          mainResult={
            result
              ? {
                label: "Basal Metabolic Rate",
                value: `${result.bmr} calories/day`,
                color: "text-red-400",
              }
              : undefined
          }
          extraRows={
            result
              ? [
                {
                  label: "Total Daily Energy Expenditure",
                  value: `${result.tdee} calories/day`,
                  valueColor: "text-yellow-400",
                },
                {
                  label: "For Weight Loss",
                  value: `${result.weightLoss} calories/day`,
                },
                {
                  label: "For Extreme Weight Loss",
                  value: `${result.extremeWeightLoss} calories/day`,
                  valueColor: "text-orange-400",
                },
                {
                  label: "For Weight Gain",
                  value: `${result.weightGain} calories/day`,
                  valueColor: "text-green-400",
                },
              ]
              : undefined
          }
        />
      </div>

      {/* ── About Section ── */}
      <section aria-labelledby="about-bmr" className="mb-8">
        <h2 id="about-bmr" className="text-xl font-semibold text-white mb-3">
          About the BMR Calculator
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Most people trying to manage their weight focus entirely on what they
          eat — but the more foundational question is:{" "}
          <em>how much does your body actually need just to function?</em> That
          answer is your{" "}
          <strong className="text-gray-300">
            Basal Metabolic Rate (BMR)
          </strong>
          . It's the number of calories your body burns every single day simply
          by being alive — keeping your heart pumping, your lungs working, your
          kidneys filtering, and your billions of cells doing their jobs. No
          exercise required. Just existing.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Here's what surprises most people: BMR accounts for{" "}
          <strong className="text-gray-300">60–75%</strong> of everything you
          burn in a day. Exercise, walking around, and digesting food make up
          the rest. This means the single biggest lever in your calorie equation
          isn't how hard you work out — it's your resting metabolism.
          Understanding it changes how you approach everything from meal
          planning to training.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our calculator uses both the{" "}
          <strong className="text-gray-300">Mifflin-St Jeor equation</strong>{" "}
          (the gold standard recommended by most dietitians for the general
          population) and the{" "}
          <strong className="text-gray-300">
            revised Harris-Benedict formula
          </strong>{" "}
          (the historically trusted method, still widely used in clinical
          settings). Both are free, research-validated, and take under 30
          seconds to use. Once you have your BMR, we also calculate your{" "}
          <strong className="text-gray-300">
            Total Daily Energy Expenditure (TDEE)
          </strong>{" "}
          — your real-world daily calorie burn adjusted for how active you
          actually are — along with personalised calorie targets for weight
          loss, maintenance, and muscle gain.
        </p>
      </section>

      {/* ── Formula Section ── */}
      <section aria-labelledby="bmr-formula" className="mb-8">
        <h2
          id="bmr-formula"
          className="text-xl font-semibold text-white mb-3"
        >
          BMR Formulas Explained
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Both formulas use the same four variables — weight (W in kg), height
          (H in cm), age (A in years), and biological sex — but were developed
          decades apart using different population samples. Here's what each one
          calculates, and when to use which.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">
              Mifflin-St Jeor Equation (1990)
            </h3>
            <p className="text-white font-mono text-xs mb-1">
              Men: BMR = 10×W + 6.25×H − 5×A + 5
            </p>
            <p className="text-white font-mono text-xs mb-3">
              Women: BMR = 10×W + 6.25×H − 5×A − 161
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Developed in 1990 using a more diverse and modern population
              sample, this formula consistently outperforms others in validation
              studies. The Academy of Nutrition and Dietetics considers it the
              preferred equation for estimating resting energy expenditure in
              healthy adults. Accuracy: within 90–95% of measured RMR for most
              people.
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">
              Harris-Benedict Equation (Revised 1984)
            </h3>
            <p className="text-white font-mono text-xs mb-1">
              Men: BMR = 88.362 + 13.397×W + 4.799×H − 5.677×A
            </p>
            <p className="text-white font-mono text-xs mb-3">
              Women: BMR = 447.593 + 9.247×W + 3.098×H − 4.330×A
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Originally published in 1919 and significantly revised in 1984,
              this formula remains one of the most widely cited in nutrition
              research and clinical practice. It tends to slightly overestimate
              calorie needs in sedentary individuals but performs well for
              active adults. Use it as a comparison point or if you prefer a
              historically established reference.
            </p>
          </div>
        </div>
      </section>

      {/* ── Activity Level Table ── */}
      <section aria-labelledby="activity-table" className="mb-8">
        <h2
          id="activity-table"
          className="text-xl font-semibold text-white mb-3"
        >
          Activity Level Multipliers — How TDEE Is Calculated
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Your BMR tells you how many calories you burn at rest. But in real
          life, you move — and that movement multiplies your calorie needs. To
          find your{" "}
          <strong className="text-gray-300">
            Total Daily Energy Expenditure (TDEE)
          </strong>
          , we multiply your BMR by an activity factor based on your typical
          weekly routine. Be honest here: most people overestimate their
          activity level, which leads to eating more than their body actually
          needs.
        </p>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                  Activity Level
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold hidden md:table-cell">
                  Who It's For
                </th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">
                  Multiplier
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  ...ACTIVITY_LEVELS[0],
                  desc: "Desk job, minimal walking, no formal exercise",
                },
                {
                  ...ACTIVITY_LEVELS[1],
                  desc: "Office worker who goes to the gym 1–3 days/week",
                },
                {
                  ...ACTIVITY_LEVELS[2],
                  desc: "Active lifestyle with consistent 3–5 day workout routine",
                },
                {
                  ...ACTIVITY_LEVELS[3],
                  desc: "Athletes training twice daily or very physically demanding jobs",
                },
                {
                  ...ACTIVITY_LEVELS[4],
                  desc: "Construction, farming, or elite athletes in heavy training",
                },
              ].map((level, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-800/50 hover:bg-white/5"
                >
                  <td className="py-3 px-4 text-gray-300">{level.label}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs hidden md:table-cell">
                    {level.desc}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400 font-mono">
                    ×{level.multiplier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── BMR by Group ── */}
      <section aria-labelledby="bmr-groups" className="mb-8">
        <h2
          id="bmr-groups"
          className="text-xl font-semibold text-white mb-3"
        >
          BMR Across Different Groups
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          The same BMR formula applies to everyone, but the numbers — and what
          they mean — vary considerably across age groups, fitness levels, and
          biological differences. Here's what you need to know about your
          specific situation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Women */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pink-400 mb-2">
              BMR for Women
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Women naturally carry a higher percentage of body fat compared to
              men at the same BMI, which means a lower proportion of metabolically
              active muscle tissue — and therefore a lower BMR. On average,
              women's BMR runs 5–10% below men's of the same age, weight, and
              height. BMR also fluctuates slightly across the menstrual cycle
              (highest during the luteal phase) and drops significantly after
              menopause due to declining estrogen. Women who are pregnant or
              breastfeeding have substantially higher calorie needs — standard
              BMR formulas do not account for this, so consult a healthcare
              provider for personalised guidance.
            </p>
          </div>

          {/* Men */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">
              BMR for Men
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Higher testosterone levels and greater natural muscle mass give men
              a metabolic advantage at rest. Because muscle tissue burns
              significantly more calories than fat at rest, men tend to have
              higher BMR values even when body weight is identical to a woman's.
              This advantage decreases with age as testosterone declines and muscle
              mass gradually reduces — typically from around age 30 onward. Men
              who lift weights regularly can meaningfully preserve their BMR by
              maintaining muscle mass through their 40s, 50s, and beyond.
            </p>
          </div>

          {/* Seniors */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">
              BMR for Older Adults (65+)
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Ageing brings a gradual but meaningful metabolic slowdown. After 60,
              muscle loss accelerates (sarcopenia) and organ function can
              decline — both reducing the body's resting energy demands. Standard
              BMR formulas often overestimate calorie needs in this age group,
              which can inadvertently support weight gain. Many geriatric dietitians
              recommend adjusting downward from calculator results and focusing
              on protein intake and resistance exercise to protect muscle mass.
              If you're over 65, treat your BMR result as an upper estimate rather
              than a precise target.
            </p>
          </div>

          {/* Athletes */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-green-400 mb-2">
              BMR for Athletes &amp; Highly Active People
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Standard BMR formulas significantly underestimate calorie needs for
              athletes and muscular individuals because they rely on total body
              weight — not lean body mass. A competitive athlete can have a true
              BMR that's 15–25% higher than the calculator predicts. If you're
              highly muscular, consider the Katch-McArdle formula (which uses lean
              body mass) for more accurate results. As a practical rule: if you're
              consistently eating at your calculated TDEE but still losing weight
              unintentionally, your actual metabolic rate is likely higher than
              estimated.
            </p>
          </div>
        </div>
      </section>

      {/* ── Limitations ── */}
      <section aria-labelledby="bmr-limitations" className="mb-8">
        <h2
          id="bmr-limitations"
          className="text-xl font-semibold text-white mb-3"
        >
          Limitations of BMR Calculators
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          BMR calculators are useful tools, but they're estimates — not
          measurements. Understanding where they fall short helps you use the
          results more intelligently and avoid common mistakes.
        </p>
        <div className="space-y-3">
          {[
            {
              title: "They estimate, not measure",
              color: "text-red-400",
              desc:
                "No formula can measure your actual metabolic rate — only indirect calorimetry (a clinical test using breath analysis) can do that. Expect your true BMR to be within ±10% of the calculated figure. Use the number as a starting point, then adjust based on real-world results over 2–4 weeks.",
            },
            {
              title: "Body composition is invisible to the formula",
              color: "text-orange-400",
              desc:
                "A 180 lb person who is 15% body fat has far more muscle — and a higher BMR — than a 180 lb person who is 35% body fat. Both get the same formula result. If you have above-average muscle mass or above-average body fat, your actual BMR will differ meaningfully from the estimate.",
            },
            {
              title: "Thyroid and hormonal health matter enormously",
              color: "text-yellow-400",
              desc:
                "Hypothyroidism can suppress BMR by 20–40%. Hyperthyroidism can elevate it by 40–80%. PCOS, insulin resistance, and cortisol imbalances all affect metabolism in ways the formula can't capture. If your results feel wildly off from your real experience, consider a hormonal panel with your doctor.",
            },
            {
              title: "Metabolic adaptation isn't factored in",
              color: "text-blue-400",
              desc:
                "Extended calorie restriction causes metabolic adaptation — your body actively lowers its BMR in response to perceived food scarcity. Someone who has dieted aggressively for months may have a true BMR 15–30% below their calculated value. This is one reason why recalculating BMR regularly during a weight loss journey is important.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-gray-800 rounded-xl p-5 flex gap-4"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`w-2 h-2 rounded-full bg-current ${item.color} mt-1.5`}
                />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${item.color}`}
                >
                  {item.title}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-4 leading-relaxed">
          <strong className="text-gray-400">Medical Disclaimer:</strong> BMR
          calculations are for informational and educational purposes only. They
          are not a substitute for professional medical or nutritional advice.
          Always consult a qualified healthcare provider before making
          significant changes to your diet, especially if you have any
          underlying medical conditions.
        </p>
      </section>

      {/* ── How to Use Section ── */}
      <section aria-labelledby="how-to-use" className="mb-8">
        <h2
          id="how-to-use"
          className="text-xl font-semibold text-white mb-3"
        >
          How to Use Your BMR Result
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Getting your BMR number is step one. Here's what to actually do with
          it — whether your goal is losing fat, building muscle, or simply
          maintaining your current weight without constant calorie counting.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              goal: "Weight Loss",
              color: "text-orange-400",
              border: "border-orange-400/20",
              steps: [
                "Calculate your TDEE (BMR × activity multiplier)",
                "Subtract 300–500 calories from TDEE for a sustainable deficit",
                "Never eat below your BMR — this triggers muscle loss",
                "Recalculate every 4–6 weeks as your weight changes",
              ],
            },
            {
              goal: "Weight Maintenance",
              color: "text-blue-400",
              border: "border-blue-400/20",
              steps: [
                "Eat at your TDEE (BMR × activity multiplier)",
                "Adjust by ±100–200 calories based on weekly weight trends",
                "Weigh yourself at the same time each day for accuracy",
                "Reassess activity multiplier if lifestyle changes",
              ],
            },
            {
              goal: "Muscle Gain",
              color: "text-green-400",
              border: "border-green-400/20",
              steps: [
                "Add 250–500 calories above TDEE for a lean bulk",
                "Prioritise protein: 0.7–1g per pound of body weight",
                "Track weight weekly — aim for 0.25–0.5 lb gain per week",
                "Increase calories gradually to minimise fat gain",
              ],
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-[#111827] border ${item.border} rounded-xl p-5`}
            >
              <h3 className={`text-sm font-semibold ${item.color} mb-3`}>
                {item.goal}
              </h3>
              <ul className="space-y-2">
                {item.steps.map((step, j) => (
                  <li key={j} className="flex gap-2 text-xs text-gray-400">
                    <span className={`${item.color} flex-shrink-0 font-bold`}>
                      {j + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section
        aria-labelledby="faq-heading"
        className="mb-8"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <h2
          id="faq-heading"
          className="text-xl font-semibold text-white mb-4"
        >
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
              >
                <span
                  className="text-sm font-medium text-gray-200"
                  itemProp="name"
                >
                  {item.q}
                </span>
                <span
                  className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""
                    }`}
                >
                  +
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-[500px] pb-4" : "max-h-0"
                  }`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
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