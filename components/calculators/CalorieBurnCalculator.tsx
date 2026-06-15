"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const ACTIVITIES = [
  { value: "running", label: "🏃 Running (8 km/h / 5 mph)", met: 8.0, detail: "Burns 800-1000 calories/hour" },
  { value: "jogging", label: "🏃 Jogging (6 km/h / 3.7 mph)", met: 7.0, detail: "Moderate pace, good for beginners" },
  { value: "walking", label: "🚶 Walking (5 km/h / 3.1 mph)", met: 3.5, detail: "Brisk walking, 100 steps/minute" },
  { value: "cycling", label: "🚴 Cycling (moderate, 20 km/h)", met: 6.8, detail: "Leisure cycling on flat terrain" },
  { value: "cycling-intense", label: "🚴 Cycling (intense, 25-30 km/h)", met: 10.0, detail: "Racing or mountain biking" },
  { value: "swimming", label: "🏊 Swimming (moderate)", met: 7.0, detail: "Freestyle/crawl lap swimming" },
  { value: "hiit", label: "⚡ HIIT Workout", met: 8.0, detail: "High Intensity Interval Training" },
  { value: "gym", label: "💪 Weight Training (moderate)", met: 6.0, detail: "Circuit training with rests" },
  { value: "gym-intense", label: "💪 Weight Training (intense)", met: 8.0, detail: "CrossFit, powerlifting" },
  { value: "yoga", label: "🧘 Yoga", met: 3.0, detail: "Hatha or gentle flow yoga" },
  { value: "pilates", label: "🧘 Pilates", met: 4.0, detail: "Mat pilates, core focused" },
  { value: "dancing", label: "💃 Dancing (moderate)", met: 5.0, detail: "Ballroom, Zumba, salsa" },
  { value: "jumping-rope", label: "🦘 Jumping Rope (70-80 skips/min)", met: 11.8, detail: "Excellent cardio, high burn" },
  { value: "stairs", label: "🪜 Climbing Stairs", met: 8.8, detail: "Walking up stairs machine" },
  { value: "football", label: "⚽ Football/Soccer", met: 7.5, detail: "Recreational play, moderate" },
  { value: "basketball", label: "🏀 Basketball", met: 6.5, detail: "Recreational game play" },
  { value: "tennis", label: "🎾 Tennis (singles)", met: 8.0, detail: "Competitive singles match" },
  { value: "hiking", label: "🥾 Hiking (uphill)", met: 7.0, detail: "Carrying light pack" },
  { value: "elliptical", label: "🏋️ Elliptical Trainer", met: 6.0, detail: "Moderate resistance" },
  { value: "rowing", label: "🚣 Rowing Machine", met: 7.0, detail: "Moderate pace, full body" },
];

const FAQ_DATA = [
  { q: "How accurate is the calorie burn calculator?", a: "Our calculator uses MET (Metabolic Equivalent of Task) values from the Compendium of Physical Activities, which is the scientific standard. Accuracy is within 85-95% of actual calories burned. Individual factors like fitness level, body composition, and efficiency of movement can cause variations of 10-20%." },
  { q: "What is MET and how does it work?", a: "MET (Metabolic Equivalent of Task) represents the energy cost of physical activity. 1 MET = energy expended at rest (~1 kcal/kg/hour). An activity with MET = 6 requires 6 times more energy than resting. Higher MET = more calories burned per minute." },
  { q: "How many calories should I burn daily for weight loss?", a: "To lose 0.5 kg per week, create a 500-700 calorie daily deficit through diet and exercise. Aim for 250-400 calories burned through exercise daily, combined with 250-300 calorie diet reduction. Never eat below your BMR, and don't exceed 1000 calories burned daily through exercise without professional guidance." },
  { q: "What exercises burn the most calories per hour?", a: "Highest calorie-burning activities: Jumping rope (800-1000 cal/hr), Running at 12 km/h (900 cal/hr), HIIT workouts (600-900 cal/hr), Swimming laps (700-800 cal/hr), Rowing machine (600-800 cal/hr), Cycling at 30 km/h (700-900 cal/hr). Intensity matters more than duration." },
  { q: "Does weight affect calories burned?", a: "Yes! Heavier individuals burn more calories for the same activity because moving a larger mass requires more energy. Our calculator accounts for your specific weight. A 90kg person burns roughly 25-30% more calories than a 68kg person doing the same activity for the same duration." },
  { q: "What is EPOC (afterburn effect)?", a: "EPOC (Excess Post-Exercise Oxygen Consumption) is the calories your body burns after exercise to return to resting state. HIIT and intense strength training can elevate metabolism for 2-24 hours post-workout, adding 5-15% to total calorie burn. Our calculator shows exercise-only calories; actual total may be higher with afterburn." },
  { q: "What is the best time to exercise for calorie burn?", a: "Morning workouts may boost metabolism throughout the day (afterburn effect). Afternoon/evening workouts often achieve higher intensity as body temperature peaks. Consistency matters more than timing — the best time is when you'll actually exercise regularly." },
  { q: "How does age affect calorie burn?", a: "Metabolism naturally slows with age due to muscle loss (sarcopenia). Adults lose 3-8% of muscle mass per decade after 30, reducing calorie burn by 2-5% per decade. Strength training helps maintain muscle and metabolic rate as you age." },
  { q: "Can I burn calories after exercise (afterburn)?", a: "Yes — EPOC (Excess Post-Exercise Oxygen Consumption) keeps metabolism elevated for 2-24 hours post-workout. HIIT and heavy strength training produce the strongest afterburn effect, adding 5-15% to total calorie burn beyond the exercise itself." },
  { q: "How accurate are fitness trackers vs this calculator?", a: "Fitness trackers measure heart rate and movement for personalized estimates (±10-20% accuracy). Our calculator uses MET standards (±10-15% accuracy). For best results, use this calculator for planning and trackers for daily monitoring." },
  { q: "How many calories should I burn to lose 1kg?", a: "1 kg of body fat = approximately 7,700 calories. To lose 1 kg per week, create a 1,100 calorie daily deficit (through diet + exercise). Safe rate is 0.5-1 kg per week. Never exceed 1,000 calories burned through exercise daily without medical supervision." },
];

const CALORIE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calorie Burn Calculator – Exercise Calorie Counter",
  description: "Calculate calories burned during any activity. Uses MET values from sports medicine research. Track running, cycling, swimming, gym workouts and more.",
  url: "https://www.numrexo.com/fitness/calorie-burn-calculator",
  applicationCategory: "HealthApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function CalorieBurnCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("running");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const selectedActivity = ACTIVITIES.find(a => a.value === activity);

    if (!w || !d || !selectedActivity || isNaN(w) || isNaN(d) || w <= 0 || d <= 0) {
      alert("Please enter valid weight and duration values");
      return;
    }

    const caloriesPerMinute = (selectedActivity.met * 3.5 * w) / 200;
    const totalCalories = caloriesPerMinute * d;
    const caloriesPerHour = caloriesPerMinute * 60;
    const caloriesPer30Min = caloriesPerMinute * 30;
    const weeklyCalories = totalCalories * 5;
    const monthlyCalories = totalCalories * 20;

    let intensity = "";
    if (selectedActivity.met < 3) intensity = "Light";
    else if (selectedActivity.met < 6) intensity = "Moderate";
    else if (selectedActivity.met < 9) intensity = "Vigorous";
    else intensity = "Very Vigorous";

    setResult({
      totalCalories: Math.round(totalCalories),
      caloriesPerMinute: caloriesPerMinute.toFixed(1),
      caloriesPerHour: Math.round(caloriesPerHour),
      caloriesPer30Min: Math.round(caloriesPer30Min),
      weeklyCalories: Math.round(weeklyCalories),
      monthlyCalories: Math.round(monthlyCalories),
      activityName: selectedActivity.label,
      duration: d,
      weight: w,
      intensity,
      met: selectedActivity.met,
    });
  };

  const resetForm = () => {
    setWeight("");
    setActivity("running");
    setDuration("");
    setResult(null);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CALORIE_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/fitness" className="hover:text-gray-300">Fitness Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">Calorie Burn Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Activity Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Your Weight</label>
              <div className="relative">
                <input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Heavier individuals burn more calories for the same activity</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Activity Type</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">
                {ACTIVITIES.map((act) => (<option key={act.value} value={act.value}>{act.label}</option>))}
              </select>
              <p className="text-xs text-gray-500 mt-1">{ACTIVITIES.find(a => a.value === activity)?.detail}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Duration</label>
              <div className="relative">
                <input type="number" placeholder="30" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">minutes</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">Calculate Calories Burned →</button>
              <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
            </div>
          </div>
        </div>

        <ResultBox
          title="Calories Burned"
          isEmpty={!result}
          emptyIcon="🔥"
          emptyText="Enter your weight, activity, and duration"
          mainResult={result ? { label: "Total Calories Burned", value: `${result.totalCalories} kcal`, color: "text-orange-400" } : undefined}
          extraRows={result ? [
            { label: "Activity Intensity", value: `${result.intensity} (${result.met} METs)` },
            { label: "Calories per Minute", value: `${result.caloriesPerMinute} kcal` },
            { label: "Calories per 30 Minutes", value: `${result.caloriesPer30Min} kcal` },
            { label: "Calories per Hour", value: `${result.caloriesPerHour} kcal` },
            { label: "Weekly (5 sessions)", value: `${result.weeklyCalories} kcal`, valueColor: "text-yellow-400" },
            { label: "Monthly (20 sessions)", value: `${result.monthlyCalories} kcal`, valueColor: "text-green-400" },
          ] : undefined}
        />
      </div>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Calorie Burn Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our calorie burn calculator uses <strong className="text-gray-300">MET (Metabolic Equivalent of Task)</strong> values from the Compendium of Physical Activities, the scientific standard for exercise energy expenditure. Whether you're tracking workouts for weight loss or fitness goals, get accurate estimates for any activity.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Understanding how many calories you burn during different activities is essential for weight management and fitness planning. This calculator helps you make informed decisions about which activities give you the best return on your exercise time investment.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          For best results, combine exercise tracking with proper nutrition. A calorie deficit of 500-700 calories daily leads to healthy weight loss of 0.5 kg per week. Remember that consistency matters more than intensity — regular moderate exercise beats sporadic intense workouts.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">How to Use This Calorie Burn Calculator</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">body weight</strong> in kilograms — this is the most important factor for accuracy.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select your <strong className="text-white">activity type</strong> from 20+ options including running, cycling, swimming, gym workouts, and more.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">duration</strong> of your activity in minutes.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">Calculate Calories Burned</strong> to see your results.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and calculate a different activity.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Benefits of Tracking Calories Burned</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Weight Loss Management</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Create accurate calorie deficits by knowing exactly how much you burn. Track daily exercise calories to achieve your weight loss goals scientifically.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Workout Optimization</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Compare different activities to see which gives you the best calorie burn per minute. Maximize your limited workout time effectively.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Progress Tracking</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Monitor weekly and monthly calorie burn totals to stay motivated. Set achievable goals and celebrate milestones.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Nutrition Planning</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Balance your calorie intake with expenditure. Know how much you can eat while maintaining or losing weight.</p>
          </div>
        </div>
      </section>

      {/* Calorie Burn Formula */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Calorie Burn Formula</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-white font-mono text-sm mb-2">Calories/Minute = (MET × 3.5 × Weight in kg) ÷ 200</p>
          <p className="text-gray-500 text-xs">Example: 70kg person running (MET=8) for 30 minutes = (8 × 3.5 × 70) ÷ 200 × 30 = 294 calories burned</p>
          <p className="text-gray-500 text-xs mt-2">This formula is based on the standard metabolic equation used in exercise physiology research since the 1980s.</p>
        </div>
      </section>

      {/* Calorie Burn by Activity Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Calories Burned per Hour (70kg person)</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                <th className="text-left py-3 px-4 text-gray-400">Activity</th>
                <th className="text-right py-3 px-4 text-gray-400">MET</th>
                <th className="text-right py-3 px-4 text-gray-400">Calories/Hour</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITIES.map((act, i) => {
                const calPerHour = (act.met * 3.5 * 70) / 200 * 60;
                return (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                    <td className="py-2 px-4 text-gray-300 truncate max-w-[200px]">{act.label}</td>
                    <td className="py-2 px-4 text-right text-yellow-400">{act.met}</td>
                    <td className="py-2 px-4 text-right text-green-400">{Math.round(calPerHour)} kcal</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">*Calories vary based on your actual weight. Heavier individuals burn more.</p>
      </section>

      {/* Activity Intensity Guide */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Activity Intensity Guide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">💚</div><div className="text-sm font-semibold text-green-400">Light</div><div className="text-xs text-gray-500">MET &lt; 3</div><div className="text-xs text-gray-600 mt-1">Walking, Yoga, Light stretching</div></div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">💛</div><div className="text-sm font-semibold text-yellow-400">Moderate</div><div className="text-xs text-gray-500">MET 3-6</div><div className="text-xs text-gray-600 mt-1">Jogging, Cycling (leisure), Dancing</div></div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">🧡</div><div className="text-sm font-semibold text-orange-400">Vigorous</div><div className="text-xs text-gray-500">MET 6-9</div><div className="text-xs text-gray-600 mt-1">Running, HIIT, Swimming laps</div></div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><div className="text-2xl mb-1">❤️</div><div className="text-sm font-semibold text-red-400">Very Vigorous</div><div className="text-xs text-gray-500">MET 9+</div><div className="text-xs text-gray-600 mt-1">Jump Rope, Rowing (race pace)</div></div>
        </div>
      </section>

      {/* Weekly/Monthly Planning */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Weekly & Monthly Calorie Burn Planning</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Weight Loss Goal (0.5 kg/week):</strong> Create a 3,850 calorie weekly deficit → Burn 385 calories daily through exercise + reduce 385 calories from diet.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Weight Loss Goal (1 kg/week):</strong> Create a 7,700 calorie weekly deficit → Burn 550 calories daily through exercise + reduce 550 calories from diet. Consult doctor before attempting.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Maintenance Goal:</strong> Match your daily calorie burn with intake. Use this calculator to see how much you can eat without gaining weight.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Progressive Overload:</strong> As you get fitter, increase duration or intensity to continue burning the same calories. Your body adapts and becomes more efficient over time.</p>
        </div>
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