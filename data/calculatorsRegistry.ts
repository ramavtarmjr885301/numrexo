// data/calculatorsRegistry.ts - EXPANDED VERSION

export interface CalculatorType {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
  tags: string[];
  category: 'health' | 'fitness' | 'finance' | 'tax' | 'math' | 'conversion' | 'education' | 'construction' | 'business' | 'science' | 'time' | 'cooking' | 'travel' | 'investment';
  path: string;
  isNew?: boolean;
  popularity?: number;
  comingSoon?: boolean;
}

export const CATEGORIES = {
  health: { name: 'Health & Wellness', icon: '❤️', order: 1, basePath: '/health' },
  fitness: { name: 'Fitness', icon: '💪', order: 2, basePath: '/fitness' },
  finance: { name: 'Finance', icon: '💰', order: 3, basePath: '/finance' },
  tax: { name: 'Tax', icon: '📋', order: 4, basePath: '/tax' },
  math: { name: 'Mathematics', icon: '📐', order: 5, basePath: '/math' },
  conversion: { name: 'Converters', icon: '🔄', order: 6, basePath: '/conversion' },
  education: { name: 'Education', icon: '📚', order: 7, basePath: '/education' },
  construction: { name: 'Construction', icon: '🏗️', order: 8, basePath: '/construction' },
  business: { name: 'Business', icon: '📊', order: 9, basePath: '/business' },
  science: { name: 'Science', icon: '🔬', order: 10, basePath: '/science' },
  time: { name: 'Time & Date', icon: '⏰', order: 11, basePath: '/time' },
  cooking: { name: 'Cooking', icon: '🍳', order: 12, basePath: '/cooking' },
  travel: { name: 'Travel', icon: '✈️', order: 13, basePath: '/travel' },
  investment: { name: 'Investment', icon: '📈', order: 14, basePath: '/investment' },
};

const generatePath = (category: string, slug: string) => `/${category}/${slug}`;

export const CALCULATORS_REGISTRY: CalculatorType[] = [
  // ============ HEALTH CATEGORY (10 calculators) ============
  { id: "bmi", slug: "bmi-calculator", name: "BMI Calculator", icon: "⚖️", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate your Body Mass Index", tags: ["Health", "Popular"], category: "health", path: generatePath("health", "bmi-calculator"), popularity: 98 },
  { id: "bmr", slug: "bmr-calculator", name: "BMR Calculator", icon: "🔥", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Calculate daily calorie needs", tags: ["Fitness", "Popular"], category: "fitness", path: generatePath("fitness", "bmr-calculator"), popularity: 85, isNew: true },
  { id: "body-fat", slug: "body-fat-calculator", name: "Body Fat Calculator", icon: "📏", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Estimate body fat percentage", tags: ["Fitness"], category: "fitness", path: generatePath("fitness", "body-fat-calculator"), popularity: 75, isNew: true },
  { id: "calorie-burn", slug: "calorie-burn-calculator", name: "Calorie Burn Calculator", icon: "🏃", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Calculate calories burned during exercise", tags: ["Fitness"], category: "fitness", path: generatePath("fitness", "calorie-burn-calculator"), popularity: 80, isNew: true },
  { id: "ideal-weight", slug: "ideal-weight-calculator", name: "Ideal Weight Calculator", icon: "⭐", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Find your ideal body weight", tags: ["Health", "New"], category: "health", path: generatePath("health", "ideal-weight-calculator"), popularity: 70, isNew: true },
  { id: "water-intake", slug: "water-intake-calculator", name: "Water Intake Calculator", icon: "💧", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Daily water intake recommendation", tags: ["Health", "New"], category: "health", path: generatePath("health", "water-intake-calculator"), popularity: 78, isNew: true },
  { id: "body-type", slug: "body-type-calculator", name: "Body Type Calculator", icon: "👤", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Determine your body shape", tags: ["Health", "New"], category: "health", path: generatePath("health", "body-type-calculator"), popularity: 65, isNew: true },
  { id: "pregnancy-due", slug: "pregnancy-due-date-calculator", name: "Pregnancy Due Date", icon: "👶", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Calculate expected delivery date", tags: ["Health", "New"], category: "health", path: generatePath("health", "pregnancy-due-date-calculator"), popularity: 72, isNew: true },
  { id: "ovulation", slug: "ovulation-calculator", name: "Ovulation Calculator", icon: "🌸", color: "#f43f5e", bg: "rgba(244,63,94,0.1)", desc: "Track your fertile days", tags: ["Health", "New"], category: "health", path: generatePath("health", "ovulation-calculator"), popularity: 68, isNew: true },
  { id: "sleep", slug: "sleep-calculator", name: "Sleep Calculator", icon: "😴", color: "#6366f1", bg: "rgba(99,102,241,0.1)", desc: "Optimal sleep timing", tags: ["Health", "New"], category: "health", path: generatePath("health", "sleep-calculator"), popularity: 82, isNew: true },

  // ============ FINANCE CATEGORY (15 calculators) ============
  { id: "emi", slug: "emi-calculator", name: "EMI Calculator", icon: "🏦", color: "#a78bfa", bg: "rgba(167,139,250,0.1)", desc: "Calculate loan EMI", tags: ["Finance", "Popular"], category: "finance", path: generatePath("finance", "emi-calculator"), popularity: 95 },
  { id: "sip", slug: "sip-calculator", name: "SIP Calculator", icon: "📈", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Calculate mutual fund returns", tags: ["Investment", "Popular"], category: "investment", path: generatePath("investment", "sip-calculator"), popularity: 90, isNew: true },
  { id: "fd", slug: "fd-calculator", name: "FD Calculator", icon: "🏦", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Fixed deposit maturity", tags: ["Finance"], category: "finance", path: generatePath("finance", "fd-calculator"), popularity: 85, isNew: true },
  { id: "ppf", slug: "ppf-calculator", name: "PPF Calculator", icon: "💰", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Public Provident Fund returns", tags: ["Investment"], category: "investment", path: generatePath("investment", "ppf-calculator"), popularity: 75, isNew: true },
  { id: "lumpsum", slug: "lumpsum-calculator", name: "Lumpsum Calculator", icon: "💵", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "One-time investment returns", tags: ["Investment", "New"], category: "investment", path: generatePath("investment", "lumpsum-calculator"), popularity: 80, isNew: true },
  { id: "rd", slug: "rd-calculator", name: "RD Calculator", icon: "🏦", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Recurring deposit maturity", tags: ["Finance", "New"], category: "finance", path: generatePath("finance", "rd-calculator"), popularity: 78, isNew: true },
  { id: "nps", slug: "nps-calculator", name: "NPS Calculator", icon: "🏛️", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "National Pension System returns", tags: ["Retirement", "New"], category: "investment", path: generatePath("investment", "nps-calculator"), popularity: 70, isNew: true },
  { id: "swp", slug: "swp-calculator", name: "SWP Calculator", icon: "💸", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Systematic withdrawal plan", tags: ["Retirement", "New"], category: "investment", path: generatePath("investment", "swp-calculator"), popularity: 72, isNew: true },
  { id: "capm", slug: "capm-calculator", name: "CAPM Calculator", icon: "📊", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Expected return on stock", tags: ["Investment", "New"], category: "investment", path: generatePath("investment", "capm-calculator"), popularity: 65, isNew: true },
  { id: "cagr", slug: "cagr-calculator", name: "CAGR Calculator", icon: "📈", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Compound annual growth rate", tags: ["Finance", "Popular"], category: "finance", path: generatePath("finance", "cagr-calculator"), popularity: 88, isNew: true },
  { id: "xirr", slug: "xirr-calculator", name: "XIRR Calculator", icon: "🔄", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Irregular investment returns", tags: ["Investment", "New"], category: "investment", path: generatePath("investment", "xirr-calculator"), popularity: 68, isNew: true },
  { id: "loan-eligibility", slug: "loan-eligibility-calculator", name: "Loan Eligibility", icon: "✅", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Check your loan eligibility", tags: ["Finance", "New"], category: "finance", path: generatePath("finance", "loan-eligibility-calculator"), popularity: 82, isNew: true },
  { id: "gratuity", slug: "gratuity-calculator", name: "Gratuity Calculator", icon: "🎁", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Calculate gratuity amount", tags: ["HR", "New"], category: "finance", path: generatePath("finance", "gratuity-calculator"), popularity: 70, isNew: true },
  { id: "epf", slug: "epf-calculator", name: "EPF Calculator", icon: "🏦", color: "#f43f5e", bg: "rgba(244,63,94,0.1)", desc: "Employee provident fund", tags: ["Retirement", "New"], category: "finance", path: generatePath("finance", "epf-calculator"), popularity: 75, isNew: true },
  { id: "ltcg", slug: "ltcg-calculator", name: "LTCG Calculator", icon: "📉", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Long term capital gains tax", tags: ["Tax", "New"], category: "tax", path: generatePath("tax", "ltcg-calculator"), popularity: 72, isNew: true },

  // ============ MATH CATEGORY (12 calculators) ============
  { id: "percentage", slug: "percentage-calculator", name: "Percentage Calculator", icon: "%", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Calculate percentages easily", tags: ["Math", "Popular"], category: "math", path: generatePath("math", "percentage-calculator"), popularity: 95 },
  { id: "age", slug: "age-calculator", name: "Age Calculator", icon: "🎂", color: "#f43f5e", bg: "rgba(244,63,94,0.1)", desc: "Calculate exact age", tags: ["Math", "Popular"], category: "math", path: generatePath("math", "age-calculator"), popularity: 92 },
  { id: "fraction", slug: "fraction-calculator", name: "Fraction Calculator", icon: "➗", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Simplify fractions", tags: ["Math", "New"], category: "math", path: generatePath("math", "fraction-calculator"), popularity: 75, isNew: true },
  { id: "decimal", slug: "decimal-calculator", name: "Decimal to Fraction", icon: "🔢", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Convert decimal to fraction", tags: ["Math", "New"], category: "math", path: generatePath("math", "decimal-calculator"), popularity: 70, isNew: true },
  { id: "ratio", slug: "ratio-calculator", name: "Ratio Calculator", icon: "📊", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Simplify and compare ratios", tags: ["Math", "New"], category: "math", path: generatePath("math", "ratio-calculator"), popularity: 72, isNew: true },
  { id: "pythagorean", slug: "pythagorean-calculator", name: "Pythagorean Theorem", icon: "📐", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate triangle sides", tags: ["Geometry", "New"], category: "math", path: generatePath("math", "pythagorean-calculator"), popularity: 80, isNew: true },
  { id: "area", slug: "area-calculator", name: "Area Calculator", icon: "📏", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Calculate area of shapes", tags: ["Geometry", "New"], category: "math", path: generatePath("math", "area-calculator"), popularity: 85, isNew: true },
  { id: "volume", slug: "volume-calculator", name: "Volume Calculator", icon: "🧊", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Calculate volume of 3D shapes", tags: ["Geometry", "New"], category: "math", path: generatePath("math", "volume-calculator"), popularity: 78, isNew: true },
  { id: "slope", slug: "slope-calculator", name: "Slope Calculator", icon: "📈", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Find line slope", tags: ["Algebra", "New"], category: "math", path: generatePath("math", "slope-calculator"), popularity: 68, isNew: true },
  { id: "quadratic", slug: "quadratic-solver", name: "Quadratic Solver", icon: "✖️", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Solve quadratic equations", tags: ["Algebra", "New"], category: "math", path: generatePath("math", "quadratic-solver"), popularity: 72, isNew: true },
  { id: "mean-median-mode", slug: "statistics-calculator", name: "Statistics Calculator", icon: "📊", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Mean, median, mode", tags: ["Statistics", "New"], category: "math", path: generatePath("math", "statistics-calculator"), popularity: 75, isNew: true },
  { id: "distance", slug: "distance-calculator", name: "Distance Formula", icon: "📍", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate distance between points", tags: ["Geometry", "New"], category: "math", path: generatePath("math", "distance-calculator"), popularity: 70, isNew: true },

  // ============ CONVERSION CATEGORY (15 calculators) ============
  { id: "currency-converter", slug: "currency-converter", name: "Currency Converter", icon: "💱", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Live exchange rates", tags: ["Converter", "Popular"], category: "conversion", path: generatePath("conversion", "currency-converter"), popularity: 90, isNew: true },
  { id: "unit-converter", slug: "unit-converter", name: "Unit Converter", icon: "📐", color: "#14b8a6", bg: "rgba(20,184,166,0.1)", desc: "Convert between units", tags: ["Converter", "Popular"], category: "conversion", path: generatePath("conversion", "unit-converter"), popularity: 92, isNew: true },
  { id: "length-converter", slug: "length-converter", name: "Length Converter", icon: "📏", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Convert length units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "length-converter"), popularity: 85, isNew: true },
  { id: "weight-converter", slug: "weight-converter", name: "Weight Converter", icon: "⚖️", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Convert weight units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "weight-converter"), popularity: 88, isNew: true },
  { id: "temperature-converter", slug: "temperature-converter", name: "Temperature Converter", icon: "🌡️", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Celsius to Fahrenheit", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "temperature-converter"), popularity: 95, isNew: true },
  { id: "area-converter", slug: "area-converter", name: "Area Converter", icon: "📐", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Convert area units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "area-converter"), popularity: 75, isNew: true },
  { id: "volume-converter", slug: "volume-converter", name: "Volume Converter", icon: "🧊", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Convert volume units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "volume-converter"), popularity: 78, isNew: true },
  { id: "speed-converter", slug: "speed-converter", name: "Speed Converter", icon: "🚀", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Convert speed units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "speed-converter"), popularity: 72, isNew: true },
  { id: "time-converter", slug: "time-converter", name: "Time Converter", icon: "⏰", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Convert time units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "time-converter"), popularity: 80, isNew: true },
  { id: "data-converter", slug: "data-converter", name: "Data Converter", icon: "💾", color: "#6366f1", bg: "rgba(99,102,241,0.1)", desc: "MB to GB converter", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "data-converter"), popularity: 70, isNew: true },
  { id: "pressure-converter", slug: "pressure-converter", name: "Pressure Converter", icon: "🎈", color: "#f43f5e", bg: "rgba(244,63,94,0.1)", desc: "Convert pressure units", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "pressure-converter"), popularity: 65, isNew: true },
  { id: "energy-converter", slug: "energy-converter", name: "Energy Converter", icon: "⚡", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", desc: "Joules to calories", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "energy-converter"), popularity: 62, isNew: true },
  { id: "power-converter", slug: "power-converter", name: "Power Converter", icon: "🔌", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Watts to horsepower", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "power-converter"), popularity: 60, isNew: true },
  { id: "angle-converter", slug: "angle-converter", name: "Angle Converter", icon: "📐", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Degrees to radians", tags: ["Converter"], category: "conversion", path: generatePath("conversion", "angle-converter"), popularity: 68, isNew: true },

  // ============ TIME & DATE CATEGORY (8 calculators) ============
  { id: "date-difference", slug: "date-difference-calculator", name: "Date Difference", icon: "📅", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Days between dates", tags: ["Time", "New"], category: "time", path: generatePath("time", "date-difference-calculator"), popularity: 85, isNew: true },
  { id: "add-days", slug: "add-days-calculator", name: "Add Days to Date", icon: "➕", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate future date", tags: ["Time", "New"], category: "time", path: generatePath("time", "add-days-calculator"), popularity: 80, isNew: true },
  { id: "work-days", slug: "work-days-calculator", name: "Working Days", icon: "💼", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Count business days", tags: ["Time", "New"], category: "time", path: generatePath("time", "work-days-calculator"), popularity: 75, isNew: true },
  { id: "time-duration", slug: "time-duration-calculator", name: "Time Duration", icon: "⏱️", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Calculate time difference", tags: ["Time", "New"], category: "time", path: generatePath("time", "time-duration-calculator"), popularity: 82, isNew: true },
  { id: "birthday-countdown", slug: "birthday-countdown", name: "Birthday Countdown", icon: "🎂", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Days until next birthday", tags: ["Time", "New"], category: "time", path: generatePath("time", "birthday-countdown"), popularity: 78, isNew: true },
  { id: "stopwatch", slug: "stopwatch", name: "Stopwatch", icon: "⏱️", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Online stopwatch", tags: ["Time", "New"], category: "time", path: generatePath("time", "stopwatch"), popularity: 70, isNew: true },
  { id: "timer", slug: "timer", name: "Timer", icon: "⏲️", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Countdown timer", tags: ["Time", "New"], category: "time", path: generatePath("time", "timer"), popularity: 72, isNew: true },

  // ============ CONSTRUCTION CATEGORY (10 calculators) ============
  { id: "carpet-area", slug: "carpet-area-calculator", name: "Carpet Area", icon: "🏠", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate carpet area", tags: ["Real Estate", "New"], category: "construction", path: generatePath("construction", "carpet-area-calculator"), popularity: 75, isNew: true },
  { id: "built-up-area", slug: "built-up-area-calculator", name: "Built-up Area", icon: "🏢", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate built-up area", tags: ["Real Estate", "New"], category: "construction", path: generatePath("construction", "built-up-area-calculator"), popularity: 72, isNew: true },
  { id: "concrete", slug: "concrete-calculator", name: "Concrete Calculator", icon: "🧱", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Concrete volume needed", tags: ["Construction", "New"], category: "construction", path: generatePath("construction", "concrete-calculator"), popularity: 80, isNew: true },
  { id: "paint", slug: "paint-calculator", name: "Paint Calculator", icon: "🎨", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Paint quantity needed", tags: ["Construction", "New"], category: "construction", path: generatePath("construction", "paint-calculator"), popularity: 82, isNew: true },
  { id: "flooring", slug: "flooring-calculator", name: "Flooring Calculator", icon: "🪵", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Tiles/wood flooring", tags: ["Construction", "New"], category: "construction", path: generatePath("construction", "flooring-calculator"), popularity: 78, isNew: true },
  { id: "wallpaper", slug: "wallpaper-calculator", name: "Wallpaper Calculator", icon: "🖼️", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Wallpaper rolls needed", tags: ["Construction", "New"], category: "construction", path: generatePath("construction", "wallpaper-calculator"), popularity: 68, isNew: true },
  { id: "roofing", slug: "roofing-calculator", name: "Roofing Calculator", icon: "🏠", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Roof material estimate", tags: ["Construction", "New"], category: "construction", path: generatePath("construction", "roofing-calculator"), popularity: 70, isNew: true },
  { id: "land-area", slug: "land-area-calculator", name: "Land Area", icon: "🌾", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate land area", tags: ["Real Estate", "New"], category: "construction", path: generatePath("construction", "land-area-calculator"), popularity: 85, isNew: true },
  { id: "property-tax", slug: "property-tax-calculator", name: "Property Tax", icon: "🏛️", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Calculate property tax", tags: ["Tax", "New"], category: "tax", path: generatePath("tax", "property-tax-calculator"), popularity: 75, isNew: true },
  { id: "rental-yield", slug: "rental-yield-calculator", name: "Rental Yield", icon: "💵", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate ROI on property", tags: ["Real Estate", "New"], category: "finance", path: generatePath("finance", "rental-yield-calculator"), popularity: 72, isNew: true },

  // ============ COOKING CATEGORY (8 calculators) ============
  { id: "recipe-converter", slug: "recipe-converter", name: "Recipe Converter", icon: "📖", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Scale recipes up/down", tags: ["Cooking", "New"], category: "cooking", path: generatePath("cooking", "recipe-converter"), popularity: 78, isNew: true },
  { id: "cooking-time", slug: "cooking-time-calculator", name: "Cooking Time", icon: "⏲️", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Adjust cooking time", tags: ["Cooking", "New"], category: "cooking", path: generatePath("cooking", "cooking-time-calculator"), popularity: 75, isNew: true },
  { id: "oven-temperature", slug: "oven-temperature-converter", name: "Oven Temperature", icon: "🔥", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Convert oven temps", tags: ["Cooking", "New"], category: "cooking", path: generatePath("cooking", "oven-temperature-converter"), popularity: 82, isNew: true },
  { id: "baking-converter", slug: "baking-converter", name: "Baking Converter", icon: "🍰", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Cups to grams", tags: ["Baking", "New"], category: "cooking", path: generatePath("cooking", "baking-converter"), popularity: 80, isNew: true },
  { id: "food-expiry", slug: "food-expiry-calculator", name: "Food Expiry", icon: "📅", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Track food freshness", tags: ["Cooking", "New"], category: "cooking", path: generatePath("cooking", "food-expiry-calculator"), popularity: 65, isNew: true },
  { id: "nutrition-label", slug: "nutrition-label-generator", name: "Nutrition Label", icon: "🥗", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Generate nutrition facts", tags: ["Nutrition", "New"], category: "health", path: generatePath("health", "nutrition-label-generator"), popularity: 72, isNew: true },
  { id: "calorie-counter", slug: "calorie-counter", name: "Calorie Counter", icon: "🥑", color: "#14b8a6", bg: "rgba(20,184,166,0.1)", desc: "Track daily calories", tags: ["Nutrition", "New"], category: "health", path: generatePath("health", "calorie-counter"), popularity: 88, isNew: true },
  { id: "water-bill", slug: "water-bill-calculator", name: "Water Bill", icon: "💧", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate water bill", tags: ["Utility", "New"], category: "finance", path: generatePath("finance", "water-bill-calculator"), popularity: 70, isNew: true },

  // ============ EDUCATION CATEGORY (10 calculators) ============
  { id: "gpa", slug: "gpa-calculator", name: "GPA Calculator", icon: "📚", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate Grade Point Average", tags: ["Education", "New"], category: "education", path: generatePath("education", "gpa-calculator"), popularity: 85, isNew: true },
  { id: "cgpa", slug: "cgpa-calculator", name: "CGPA Calculator", icon: "🎓", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate Cumulative GPA", tags: ["Education", "New"], category: "education", path: generatePath("education", "cgpa-calculator"), popularity: 82, isNew: true },
  { id: "grade", slug: "grade-calculator", name: "Grade Calculator", icon: "📊", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Calculate test scores", tags: ["Education", "New"], category: "education", path: generatePath("education", "grade-calculator"), popularity: 88, isNew: true },
  { id: "weighted-grade", slug: "weighted-grade-calculator", name: "Weighted Grade", icon: "⚖️", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Calculate weighted average", tags: ["Education", "New"], category: "education", path: generatePath("education", "weighted-grade-calculator"), popularity: 78, isNew: true },
  { id: "final-grade", slug: "final-grade-calculator", name: "Final Grade", icon: "🎯", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "What you need on final", tags: ["Education", "New"], category: "education", path: generatePath("education", "final-grade-calculator"), popularity: 80, isNew: true },
  { id: "college-cost", slug: "college-cost-calculator", name: "College Cost", icon: "💰", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Estimate college expenses", tags: ["Education", "New"], category: "education", path: generatePath("education", "college-cost-calculator"), popularity: 75, isNew: true },
  { id: "student-loan", slug: "student-loan-calculator", name: "Student Loan", icon: "📖", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Calculate education loan", tags: ["Finance", "New"], category: "finance", path: generatePath("finance", "student-loan-calculator"), popularity: 78, isNew: true },
  { id: "scholarship", slug: "scholarship-calculator", name: "Scholarship", icon: "🏅", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", desc: "Calculate scholarship amount", tags: ["Education", "New"], category: "education", path: generatePath("education", "scholarship-calculator"), popularity: 68, isNew: true },
  { id: "attendance", slug: "attendance-calculator", name: "Attendance", icon: "📋", color: "#14b8a6", bg: "rgba(20,184,166,0.1)", desc: "Calculate attendance %", tags: ["Education", "New"], category: "education", path: generatePath("education", "attendance-calculator"), popularity: 85, isNew: true },
  { id: "percentage-marks", slug: "percentage-marks-calculator", name: "Percentage from Marks", icon: "%", color: "#6366f1", bg: "rgba(99,102,241,0.1)", desc: "Convert marks to %", tags: ["Education", "New"], category: "education", path: generatePath("education", "percentage-marks-calculator"), popularity: 90, isNew: true },

  // ============ TRAVEL CATEGORY (7 calculators) ============
  { id: "fuel-cost", slug: "fuel-cost-calculator", name: "Fuel Cost", icon: "⛽", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Calculate trip fuel cost", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "fuel-cost-calculator"), popularity: 85, isNew: true },
  { id: "travel-budget", slug: "travel-budget-calculator", name: "Travel Budget", icon: "✈️", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Plan your trip budget", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "travel-budget-calculator"), popularity: 80, isNew: true },
  { id: "flight-time", slug: "flight-time-calculator", name: "Flight Time", icon: "🛫", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate flight duration", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "flight-time-calculator"), popularity: 75, isNew: true },
  { id: "pace", slug: "pace-calculator", name: "Pace Calculator", icon: "🏃", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Running/walking pace", tags: ["Fitness", "New"], category: "fitness", path: generatePath("fitness", "pace-calculator"), popularity: 70, isNew: true },
  { id: "distance-speed-time", slug: "dst-calculator", name: "Distance/Speed/Time", icon: "📊", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "D = S × T calculator", tags: ["Physics", "New"], category: "science", path: generatePath("science", "dst-calculator"), popularity: 78, isNew: true },
  { id: "hotel-cost", slug: "hotel-cost-calculator", name: "Hotel Cost", icon: "🏨", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Calculate hotel expense", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "hotel-cost-calculator"), popularity: 72, isNew: true },
  { id: "luggage-allowance", slug: "luggage-allowance-calculator", name: "Luggage Allowance", icon: "🧳", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Check baggage limits", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "luggage-allowance-calculator"), popularity: 68, isNew: true },

  // ============ BUSINESS CATEGORY (8 calculators) ============
  { id: "profit-margin", slug: "profit-margin-calculator", name: "Profit Margin", icon: "📊", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate profit percentage", tags: ["Business", "New"], category: "business", path: generatePath("business", "profit-margin-calculator"), popularity: 85, isNew: true },
  { id: "markup", slug: "markup-calculator", name: "Markup Calculator", icon: "📈", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate selling price", tags: ["Business", "New"], category: "business", path: generatePath("business", "markup-calculator"), popularity: 80, isNew: true },
  { id: "discount", slug: "discount-calculator", name: "Discount Calculator", icon: "🏷️", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Calculate sale price", tags: ["Business", "New"], category: "business", path: generatePath("business", "discount-calculator"), popularity: 95, isNew: true },
  { id: "vat", slug: "vat-calculator", name: "VAT Calculator", icon: "📋", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Add/remove VAT", tags: ["Tax", "New"], category: "tax", path: generatePath("tax", "vat-calculator"), popularity: 82, isNew: true },
  { id: "sales-tax", slug: "sales-tax-calculator", name: "Sales Tax", icon: "💰", color: "#ec4899", bg: "rgba(236,72,153,0.1)", desc: "Calculate sales tax", tags: ["Tax", "New"], category: "tax", path: generatePath("tax", "sales-tax-calculator"), popularity: 88, isNew: true },
  { id: "roi", slug: "roi-calculator", name: "ROI Calculator", icon: "📈", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Return on investment", tags: ["Business", "New"], category: "business", path: generatePath("business", "roi-calculator"), popularity: 78, isNew: true },
  { id: "break-even", slug: "break-even-calculator", name: "Break-even", icon: "⚖️", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Find break-even point", tags: ["Business", "New"], category: "business", path: generatePath("business", "break-even-calculator"), popularity: 75, isNew: true },
  { id: "invoice", slug: "invoice-generator", name: "Invoice Generator", icon: "📄", color: "#14b8a6", bg: "rgba(20,184,166,0.1)", desc: "Create professional invoice", tags: ["Business", "New"], category: "business", path: generatePath("business", "invoice-generator"), popularity: 70, isNew: true },
  { id: "apy", slug: "apy-calculator", name: "APY Calculator", icon: "📈", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Calculate Annual Percentage Yield with compound interest", tags: ["Finance", "New"], category: "finance", path: generatePath("finance", "apy-calculator"), popularity: 75, isNew: true },
  { id: "loan-comparison", slug: "loan-comparison-calculator", name: "Loan Comparison Calculator", icon: "⚖️", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Compare two loans side by side", tags: ["Finance", "New"], category: "finance", path: generatePath("finance", "loan-comparison-calculator"), popularity: 78, isNew: true },
  { id: "tip", slug: "tip-calculator", name: "Tip Calculator", icon: "💰", color: "#10b981", bg: "rgba(16,185,129,0.1)", desc: "Calculate tips and split bills", tags: ["Business", "New"], category: "business", path: generatePath("business", "tip-calculator"), popularity: 92, isNew: true },
  { id: "sales-commission", slug: "sales-commission-calculator", name: "Sales Commission Calculator", icon: "💰", color: "#f97316", bg: "rgba(249,115,22,0.1)", desc: "Calculate sales commission with tiered rates and splits", tags: ["Business", "New"], category: "business", path: generatePath("business", "sales-commission-calculator"), popularity: 85, isNew: true },
  { id: "gst", slug: "gst-calculator", name: "GST Calculator", icon: "🧾", color: "#22c55e", bg: "rgba(34,197,94,0.1)", desc: "Add or remove GST from any amount. Supports all Indian GST slabs", tags: ["Tax", "India", "Free", "Popular"], category: "tax", path: generatePath("tax", "gst-calculator"), popularity: 90 },
];

// Helper functions
export const getCalculatorsByCategory = (category: string) => CALCULATORS_REGISTRY.filter(calc => calc.category === category);
export const getPopularCalculators = (limit: number = 12) => [...CALCULATORS_REGISTRY].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, limit);
export const getNewCalculators = (limit: number = 8) => CALCULATORS_REGISTRY.filter(calc => calc.isNew).slice(0, limit);
export const searchCalculators = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return CALCULATORS_REGISTRY.filter(calc =>
    calc.name.toLowerCase().includes(term) ||
    calc.desc.toLowerCase().includes(term) ||
    calc.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Total: 10 + 15 + 12 + 15 + 8 + 10 + 8 + 10 + 7 + 8 = 103 calculators! 🎉


// ============ SEO CONTENT FOR ALL CALCULATORS ============

export const seoContent: Record<string, any> = {
  // Health Calculators
  bmi: {
    intro: "The Body Mass Index (BMI) is one of the most widely used tools for assessing whether an individual has a healthy body weight relative to their height. While it isn't a perfect measure, it provides a quick and easy screening tool.",
    formula: "BMI (kg/m²) = Weight (kg) ÷ Height² (m)",
    formulaUS: "BMI = 703 × Weight (lbs) ÷ Height² (inches)",
    table: [
      ["Severe Thinness", "< 16"],
      ["Moderate Thinness", "16 – 17"],
      ["Mild Thinness", "17 – 18.5"],
      ["Normal", "18.5 – 25"],
      ["Overweight", "25 – 30"],
      ["Obese Class I", "30 – 35"],
      ["Obese Class II", "35 – 40"],
      ["Obese Class III", "> 40"],
    ],

  },

  // Fitness Calculators
  bmr: {
    intro: "Basal Metabolic Rate (BMR) is the number of calories your body burns while at complete rest—just to keep your heart beating, lungs breathing, and organs functioning.",
    formula: "Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5",
    formulaUS: "Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161",
    table: [
      ["Sedentary", "Little or no exercise", "BMR × 1.2"],
      ["Lightly Active", "Light exercise 1-3 days/week", "BMR × 1.375"],
      ["Moderately Active", "Moderate exercise 3-5 days/week", "BMR × 1.55"],
      ["Very Active", "Hard exercise 6-7 days/week", "BMR × 1.725"],
      ["Extra Active", "Physical job + intense training", "BMR × 1.9"],
    ],

  },

  "body-fat": {
    intro: "Body fat percentage is a measure of fitness that shows the proportion of fat to total body weight. Unlike BMI, it distinguishes between muscle and fat.",
    formula: "Men: Body Fat % = 86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76",
    formulaUS: "Women: Body Fat % = 163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387",
    table: [
      ["Essential Fat", "2-5%", "10-13%"],
      ["Athletes", "6-13%", "14-20%"],
      ["Fitness", "14-17%", "21-24%"],
      ["Average", "18-24%", "25-31%"],
      ["Obese", "25%+", "32%+"],
    ],

  },

  "calorie-burn": {
    intro: "Calculate calories burned during any physical activity using MET (Metabolic Equivalent of Task) values from the Compendium of Physical Activities.",
    formula: "Calories Burned = (MET × 3.5 × Weight in kg) ÷ 200 × Duration in minutes",
    table: [
      ["Running (8 km/h)", "8.0", "~600 cal/hour"],
      ["Cycling (moderate)", "6.8", "~500 cal/hour"],
      ["Swimming", "7.0", "~550 cal/hour"],
      ["Weight Training", "6.0", "~450 cal/hour"],
      ["Yoga", "3.0", "~200 cal/hour"],
    ],

  },

  // Finance Calculators
  emi: {
    intro: "EMI (Equated Monthly Instalment) is the fixed monthly payment made to a bank or lender for a loan. It consists of principal repayment and interest.",
    formula: "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)",
    table: [
      ["P", "Principal Loan Amount"],
      ["r", "Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)"],
      ["n", "Number of Monthly Installments"],
    ],
  },

  sip: {
    intro: "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds, benefiting from rupee cost averaging and power of compounding.",
    formula: "FV = P × ((1 + r)ⁿ - 1) / r × (1 + r)",
    table: [
      ["Monthly Investment", "₹5,000", "₹10,000", "₹20,000"],
      ["10 Years @12%", "₹11.6L", "₹23.2L", "₹46.4L"],
      ["15 Years @12%", "₹25.2L", "₹50.4L", "₹1.01Cr"],
      ["20 Years @12%", "₹49.8L", "₹99.6L", "₹1.99Cr"],
    ],
  },

  fd: {
    intro: "Fixed Deposit (FD) is a safe investment option where you deposit a lump sum for a fixed tenure at a predetermined interest rate.",
    formula: "A = P × (1 + r/n)^(n×t)",
    table: [
      ["Bank", "1 Year", "3 Years", "5 Years"],
      ["SBI", "6.8%", "7.0%", "7.1%"],
      ["HDFC", "6.9%", "7.1%", "7.2%"],
      ["ICICI", "7.0%", "7.2%", "7.25%"],
    ],
    faqs: [],
  },

  ppf: {
    intro: "Public Provident Fund (PPF) is a government-backed, tax-saving investment scheme with EEE (Exempt-Exempt-Exempt) tax status.",
    formula: "Maturity = P × ((1 + r)ⁿ - 1) / r × (1 + r)",
    table: [
      ["Annual Investment", "15 Years @7.1%", "20 Years @7.1%"],
      ["₹50,000", "₹13.6L", "₹21.9L"],
      ["₹1,00,000", "₹27.2L", "₹43.8L"],
      ["₹1,50,000", "₹40.8L", "₹65.7L"],
    ],
    faqs: [],
  },

  // Math Calculators
  percentage: {
    intro: "Percentage calculator helps you find what percent one number is of another, or calculate percentage increase/decrease.",
    formula: "Percentage = (Value / Total) × 100",
    table: [
      ["20% of 500", "100"],
      ["What % is 50 of 200", "25%"],
      ["Increase 100 by 20%", "120"],
      ["Decrease 100 by 20%", "80"],
    ],
    faqs: [],
  },

  age: {
    intro: "Age calculator tells you exactly how old you are in years, months, days, and even total days lived.",
    formula: "Age = Current Date - Birth Date",
    table: [
      ["Years", "Total years lived"],
      ["Months", "Total months lived"],
      ["Days", "Total days lived"],
      ["Next Birthday", "Days until next birthday"],
    ],
    faqs: [],
  },

  // Converters
  "currency-converter": {
    intro: "Currency converter helps you convert between different world currencies using real-time exchange rates.",
    formula: "Converted Amount = (Amount ÷ From Rate) × To Rate",
    table: [
      ["USD to EUR", "1 USD = 0.92 EUR"],
      ["USD to GBP", "1 USD = 0.79 GBP"],
      ["USD to INR", "1 USD = 83.50 INR"],
      ["EUR to GBP", "1 EUR = 0.86 GBP"],
    ],
    faqs: [],
  },

  "unit-converter": {
    intro: "Unit converter helps you convert between metric and imperial units for length, weight, volume, temperature, and more.",
    formula: "Converted Value = Value × Conversion Factor",
    table: [
      ["1 inch", "2.54 cm"],
      ["1 foot", "0.3048 meters"],
      ["1 mile", "1.609 km"],
      ["1 pound", "0.4536 kg"],
      ["1 gallon", "3.785 liters"],
    ],
    faqs: [],
  },


  // Health & Wellness
  "water-intake": {
    intro: "Proper hydration is essential for energy, brain function, and overall health. This calculator provides personalized water intake recommendations based on your weight and activity level.",
    formula: "Daily Water (liters) = (Weight in kg × 0.033) + Activity Adjustment",
    table: [
      ["Sedentary", "Base water only", "~2.3L for 70kg"],
      ["Moderately Active", "Base + 0.5L", "~2.8L for 70kg"],
      ["Very Active", "Base + 1.0L", "~3.3L for 70kg"],
    ],
    faqs: [],
  },

  "sleep": {
    intro: "Waking up refreshed isn't just about total sleep time - it's about timing. This calculator uses the 90-minute sleep cycle method to find your optimal bedtime.",
    formula: "Bedtime = Wake Time - (90 minutes × Number of Cycles)",
    table: [
      ["4.5 hours", "3 cycles", "Short nap-like sleep"],
      ["6 hours", "4 cycles", "Minimum for function"],
      ["7.5 hours", "5 cycles", "⭐ Recommended"],
      ["9 hours", "6 cycles", "Optimal for most"],
    ],
    faqs: [],
  },

  "ideal-weight": {
    intro: "Find your ideal body weight using multiple medical formulas. The Robinson formula is recommended for general use, while Devine remains the medical standard.",
    formula: "Men: 52 kg + 1.9 kg per inch over 5 feet | Women: 49 kg + 1.7 kg per inch over 5 feet",
    table: [
      ["Devine (Medical)", "50kg + 2.3kg/inch", "45.5kg + 2.3kg/inch"],
      ["Robinson (Recommended)", "52kg + 1.9kg/inch", "49kg + 1.7kg/inch"],
      ["Miller (Nutrition)", "56.2kg + 1.41kg/inch", "53.1kg + 1.36kg/inch"],
    ],
    faqs: [],
  },

  "ovulation": {
    intro: "Track your fertile days and predict ovulation based on your cycle length. Most women ovulate about 14 days before their next period.",
    formula: "Ovulation Day = Cycle Length - 14 | Fertile Window = Ovulation Day - 5 to Ovulation Day + 1",
    table: [
      ["28 days", "Day 14", "Days 9-15"],
      ["30 days", "Day 16", "Days 11-17"],
      ["32 days", "Day 18", "Days 13-19"],
      ["35 days", "Day 21", "Days 16-22"],
    ],
    faqs: [],
  },

  "body-type": {
    intro: "Determine your body shape based on measurements. Knowing your body type helps with fitness goals and clothing choices.",
    formula: "Based on shoulder, bust, waist, and hip measurements ratio",
    table: [
      ["Pear", "Hips wider than shoulders", "Store weight in lower body"],
      ["Apple", "Waist wider than hips", "Store weight around midsection"],
      ["Hourglass", "Bust and hips balanced", "Waist significantly narrower"],
      ["Rectangle", "All measurements similar", "Straight up and down"],
    ],
    faqs: [],
  },

  "pregnancy-due": {
    intro: "Calculate your expected due date based on your last menstrual period or conception date. This is an estimate - only 5% of babies arrive exactly on their due date.",
    formula: "Due Date = LMP + 280 days (40 weeks)",
    table: [
      ["First day of LMP", "Due date (40 weeks)", "Early term (37 weeks)", "Full term (39 weeks)"],
      ["Jan 1", "Oct 8", "Sep 24", "Oct 8"],
      ["Feb 1", "Nov 8", "Oct 25", "Nov 8"],
    ],
    faqs: [],
  },

  // Investment Calculators
  lumpsum: {
    intro: "Lumpsum investment means putting a large amount all at once. Perfect for bonuses, inheritances, or any lump sum you want to grow over time.",
    formula: "A = P × (1 + r)^n",
    table: [
      ["Investment", "10 Years @10%", "15 Years @12%", "20 Years @12%"],
      ["₹1,00,000", "₹2.59L", "₹5.47L", "₹9.65L"],
      ["₹5,00,000", "₹12.97L", "₹27.37L", "₹48.25L"],
      ["₹10,00,000", "₹25.94L", "₹54.74L", "₹96.50L"],
    ],
    faqs: [],
  },

  rd: {
    intro: "Recurring Deposit (RD) is perfect for regular savers. You deposit a fixed amount monthly and earn guaranteed returns with quarterly compounding.",
    formula: "Maturity = P × ((1 + r/4)^n - 1) / (r/4) × (1 + r/4)",
    table: [
      ["Monthly", "5 Years @7.2%", "7 Years @7.2%", "10 Years @7.2%"],
      ["₹5,000", "₹3.62L", "₹5.4L", "₹8.9L"],
      ["₹10,000", "₹7.24L", "₹10.8L", "₹17.8L"],
      ["₹15,000", "₹10.86L", "₹16.2L", "₹26.7L"],
    ],
    faqs: [],
  },

  cagr: {
    intro: "CAGR (Compound Annual Growth Rate) measures investment performance over time, smoothing out volatility to show true annual returns.",
    formula: "CAGR = (End Value ÷ Start Value)^(1/years) - 1 × 100",
    table: [
      ["Investment Type", "Expected CAGR", "Risk Level"],
      ["Equity Mutual Funds", "12-15%", "High"],
      ["Debt Funds", "7-8%", "Low"],
      ["Fixed Deposits", "6-7%", "Very Low"],
    ],
    faqs: [],
  },

  nps: {
    intro: "NPS is a government-backed retirement scheme with low costs and tax benefits. 60% is tax-free lump sum at retirement, 40% buys a monthly pension.",
    formula: "Corpus grows with monthly contributions and compounding returns",
    table: [
      ["Monthly", "30 Years @10%", "30 Years @12%"],
      ["₹5,000", "₹1.14Cr", "₹1.76Cr"],
      ["₹10,000", "₹2.28Cr", "₹3.52Cr"],
      ["₹15,000", "₹3.42Cr", "₹5.28Cr"],
    ],
    faqs: [],
  },

  swp: {
    intro: "SWP lets you turn your retirement corpus into regular monthly income. Withdraw a fixed amount each month while the rest keeps growing.",
    formula: "Based on 4% rule - designed to make money last 30+ years",
    table: [
      ["Corpus", "Monthly (4%)", "Monthly (5%)", "Monthly (6%)"],
      ["₹50L", "₹16,667", "₹20,833", "₹25,000"],
      ["₹1Cr", "₹33,333", "₹41,667", "₹50,000"],
      ["₹2Cr", "₹66,667", "₹83,333", "₹1,00,000"],
    ],
    faqs: [],
  },

  "loan-eligibility": {
    intro: "Wondering how much loan you can get? Banks typically allow your total EMIs to be 40-50% of your monthly income.",
    formula: "Max EMI = Monthly Income × 0.45 - Existing EMIs",
    table: [
      ["Monthly Income", "Max Loan (20 yrs @9%)", "Max Loan (25 yrs @9%)"],
      ["₹50,000", "₹45 Lakhs", "₹54 Lakhs"],
      ["₹75,000", "₹68 Lakhs", "₹81 Lakhs"],
      ["₹1,00,000", "₹90 Lakhs", "₹1.08 Cr"],
    ],
    faqs: [],
  },

  gratuity: {
    intro: "Gratuity is your employer's way of saying thanks for long service. You get it after 5+ years with the same company.",
    formula: "Gratuity = (Last drawn salary × 15 × Years of service) ÷ 26",
    table: [
      ["Years", "₹50,000 Salary", "₹75,000 Salary", "₹1,00,000 Salary"],
      ["10 years", "₹2.88L", "₹4.33L", "₹5.77L"],
      ["15 years", "₹4.33L", "₹6.49L", "₹8.65L"],
      ["20 years", "₹5.77L", "₹8.65L", "₹11.5L"],
    ],
    faqs: [],
  },

  epf: {
    intro: "EPF is the 'silent wealth builder' - you barely notice money leaving your salary, but over decades it grows into a massive government-guaranteed corpus.",
    formula: "12% employee + 3.67% employer contribution with quarterly compounding",
    table: [
      ["Basic Salary", "30 Years @8.1%", "35 Years @8.1%"],
      ["₹25,000", "₹3.7 Cr", "₹5.8 Cr"],
      ["₹50,000", "₹7.4 Cr", "₹11.6 Cr"],
      ["₹1,00,000", "₹14.8 Cr", "₹23.2 Cr"],
    ],
    faqs: [],
  },

  // Math Calculators
  fraction: {
    intro: "Add, subtract, multiply, or divide fractions with step-by-step results. Perfect for recipes, homework, or measurements.",
    formula: "a/b + c/d = (a×d + b×c) / (b×d)",
    table: [
      ["1/2 + 1/3", "5/6"],
      ["3/4 × 2/5", "3/10"],
      ["2/3 ÷ 1/4", "8/3 = 2 2/3"],
    ],
    faqs: [],
  },

  quadratic: {
    intro: "Solve quadratic equations ax² + bx + c = 0. Get real and complex roots with step-by-step solutions.",
    formula: "x = [-b ± √(b² - 4ac)] / (2a)",
    table: [
      ["x² - 3x + 2 = 0", "x = 2, x = 1"],
      ["x² + 2x - 8 = 0", "x = 2, x = -4"],
      ["x² - 4 = 0", "x = 2, x = -2"],
    ],
    faqs: [],
  },

  // Business Calculators
  "profit-margin": {
    intro: "Know your business numbers. Calculate profit margin, markup, and profit amount to optimize pricing strategy.",
    formula: "Profit Margin = (Revenue - Cost) ÷ Revenue × 100",
    table: [
      ["Software/Apps", "70-80%", "High margin"],
      ["Retail", "20-30%", "Medium margin"],
      ["Restaurants", "10-15%", "Lower margin"],
    ],
    faqs: [],
  },

  discount: {
    intro: "Calculate sale prices instantly. Find final price after percentage off or fixed amount discount. Perfect for shopping and budgeting.",
    formula: "Final Price = Original Price × (1 - Discount % ÷ 100)",
    table: [
      ["20% off ₹1000", "₹800 (Save ₹200)"],
      ["₹200 off ₹1000", "₹800 (Save ₹200)"],
      ["Buy 1 Get 1", "50% off on total"],
    ],
    faqs: [],
  },

  // Education Calculators
  gpa: {
    intro: "Calculate your Grade Point Average (GPA) easily. Add courses with letter grades and credit hours to get your semester GPA.",
    formula: "GPA = Total Grade Points ÷ Total Credit Hours",
    table: [
      ["A/A+", "4.0", "Excellent"],
      ["B+/B", "3.0-3.3", "Good"],
      ["C+/C", "2.0-2.3", "Average"],
      ["D/F", "0.0-1.0", "Poor"],
    ],
    faqs: [],
  },

  // Construction Calculators
  concrete: {
    intro: "Don't run out of concrete mid-pour. Calculate exact volume needed plus cement, sand, and aggregate quantities for M20 grade.",
    formula: "Volume = Length × Width × Thickness (add 10% waste)",
    table: [
      ["10'×10'×4\" slab", "1.23 m³", "10 cement bags"],
      ["Column 1' dia × 10'", "0.22 m³", "2 cement bags"],
      ["Footing 3'×3'×1'", "0.25 m³", "2 cement bags"],
    ],
    faqs: [],
  },

  // Travel Calculators
  "fuel-cost": {
    intro: "Plan your road trips better! Calculate total fuel cost based on distance, fuel price, and your vehicle's mileage.",
    formula: "Fuel Cost = Distance × Fuel Price ÷ Mileage (km/l)",
    table: [
      ["500 km", "₹105/l, 18 km/l", "₹2,917"],
      ["1000 km", "₹105/l, 15 km/l", "₹7,000"],
      ["200 km", "₹95/l, 20 km/l", "₹950"],
    ],
    faqs: [],
  },

  // Time Calculators
  "date-difference": {
    intro: "Calculate the exact difference between any two dates. Perfect for age calculation, project planning, or countdown to events.",
    formula: "Days Difference = |Date2 - Date1| / (1000 × 60 × 60 × 24)",
    table: [
      ["Jan 1 to Dec 31", "364-365 days", "52 weeks"],
      ["Birth to 18 years", "6,570 days", "~18 years"],
    ],
    faqs: [],
  },

  "ltcg": {
    intro: "The Long Term Capital Gains (LTCG) Tax Calculator helps you estimate the tax you need to pay when selling assets held for the long term. Whether you're selling shares, property, gold, or mutual funds, this calculator gives you accurate tax liability.",
    formula: "For shares: Tax = (Gain - ₹1,00,000) × 10% | For property/debt/gold: Tax = (Sale - Indexed Cost) × 20%",
    table: [
      ["Shares/Equity Funds", ">1 year", "10%", "₹1 lakh exemption"],
      ["Real Estate", ">3 years", "20%", "Indexation benefit"],
      ["Debt Funds/Bonds", ">3 years", "20%", "Indexation benefit"],
      ["Gold/Jewellery", ">3 years", "20%", "Indexation benefit"],
    ],
    faqs: [],
  },
  "vat": {
    intro: "The VAT Calculator helps you calculate Value Added Tax for the UK, Europe, Canada, and Australia. Add or remove VAT from any amount instantly.",
    formula: "With VAT = Amount × (1 + Rate/100) | Without VAT = Amount ÷ (1 + Rate/100)",
    table: [
      ["United Kingdom", "20%", "5%", "0%"],
      ["Germany", "19%", "7%", "0%"],
      ["France", "20%", "5.5%", "0%"],
      ["Italy", "22%", "10%", "0%"],
      ["Canada (GST)", "5%", "0%", "0%"],
    ],
    faqs: [],
  },
  "sales-tax": {
    intro: "The Sales Tax Calculator helps you calculate sales tax for purchases in the United States. Includes state-by-state rates and local tax adjustments.",
    formula: "Total = Amount × (1 + Tax Rate/100) | Pre-Tax = Total ÷ (1 + Tax Rate/100)",
    table: [
      ["California", "7.25%", "10.25%", "Highest combined rate"],
      ["Texas", "6.25%", "8.25%", "No tax on groceries"],
      ["New York", "4%", "8.875%", "NYC adds 4.5%"],
      ["Florida", "6%", "7.5%", "No tax on groceries"],
      ["Illinois", "6.25%", "10.25%", "Home rule communities"],
    ],
    faqs: [],
  },

  "roi": {
    intro: "The Return on Investment (ROI) Calculator helps you measure the profitability of your investments. Whether you're investing in stocks, real estate, business, or marketing campaigns, this calculator gives you instant ROI calculations.",
    formula: "ROI = (Net Profit ÷ Cost of Investment) × 100 | CAGR = (Final ÷ Initial)^(1/years) - 1 × 100",
    table: [
      ["Stock Market", "10-15%", "High", "3-5 years"],
      ["Real Estate", "8-12%", "Medium", "5-10 years"],
      ["Mutual Funds", "10-12%", "Medium", "3-5 years"],
      ["Fixed Deposits", "6-7%", "Low", "1-5 years"],
      ["Business", "20-30%", "High", "2-5 years"],
    ],
    faqs: [],
  },
  "break-even": {
    intro: "The Break-even Calculator helps you determine the point where your business becomes profitable. Whether you're starting a new business, launching a product, or analyzing existing operations, knowing your break-even point is essential.",
    formula: "Break-even (units) = Fixed Costs ÷ (Price - Variable Cost) | Break-even (₹) = Fixed Costs ÷ Contribution Margin Ratio",
    table: [
      ["Coffee Shop", "₹2,00,000", "₹150", "₹50", "2,000 cups"],
      ["T-Shirt Brand", "₹50,000", "₹500", "₹200", "167 shirts"],
      ["Software SaaS", "₹5,00,000", "₹1,000", "₹100", "556 customers"],
      ["Restaurant", "₹3,00,000", "₹400", "₹150", "1,200 meals"],
    ],
    faqs: [],
  },
  "markup": {
    intro: "The Markup Calculator helps you set the right prices for your products. Whether you're a retailer, manufacturer, or service provider, knowing your markup is essential for profitability.",
    formula: "Markup % = (SP - CP) ÷ CP × 100 | SP = CP × (1 + Markup/100) | CP = SP ÷ (1 + Markup/100)",
    table: [
      ["Retail Clothing", "50-100%", "33-50%", "Fashion has high markups"],
      ["Electronics", "20-40%", "17-29%", "Competitive pricing"],
      ["Restaurants", "60-80%", "38-44%", "Food cost is key"],
      ["Professional Services", "100-300%", "50-75%", "Labor-based pricing"],
      ["Jewelry", "200-400%", "67-80%", "Very high markup"],
    ],
    faqs: [],
  },

  "cgpa": {
    intro: "The CGPA Calculator helps you calculate your Cumulative Grade Point Average across all semesters. Perfect for university students who need to track their overall academic performance.",
    formula: "CGPA = Σ (GPA × Credits) ÷ Σ Credits | Percentage ≈ CGPA × 9.5",
    table: [
      ["A+", "10", "90-100%", "Outstanding"],
      ["A", "9", "80-89%", "Excellent"],
      ["B+", "8", "70-79%", "Very Good"],
      ["B", "7", "60-69%", "Good"],
      ["C+", "6", "55-59%", "Above Average"],
      ["C", "5", "50-54%", "Average"],
      ["D", "4", "40-49%", "Pass"],
      ["F", "0", "Below 40%", "Fail"],
    ],
    faqs: [],
  },
  "grade": {
    intro: "The Grade Calculator helps you calculate your weighted course grade and determine what you need on your final exam. Perfect for students who want to track their progress.",
    formula: "Weighted Grade = Σ (Score × Weight ÷ 100) | Final Needed = (Desired - Current × (1 - Weight/100)) ÷ (Weight/100)",
    table: [
      ["A+", "97-100%", "4.0", "Excellent"],
      ["A", "93-96%", "4.0", "Excellent"],
      ["A-", "90-92%", "3.7", "Excellent"],
      ["B+", "87-89%", "3.3", "Very Good"],
      ["B", "83-86%", "3.0", "Good"],
      ["B-", "80-82%", "2.7", "Good"],
      ["C+", "77-79%", "2.3", "Satisfactory"],
      ["C", "73-76%", "2.0", "Satisfactory"],
      ["D", "60-69%", "1.0", "Poor"],
      ["F", "0-59%", "0.0", "Fail"],
    ],
    faqs: [],
  },
  "weighted-grade": {
    intro: "The Weighted Grade Calculator helps you calculate your overall course grade when different categories have different weights. Perfect for students tracking homework, quizzes, tests, and finals.",
    formula: "Weighted Grade = Σ (Category Grade × Category Weight ÷ 100)",
    table: [
      ["Homework", "10-15%", "Do all assignments"],
      ["Quizzes", "15-20%", "Study weekly"],
      ["Projects", "15-25%", "Start early"],
      ["Midterm", "20-25%", "Review all material"],
      ["Final Exam", "25-40%", "Start 2 weeks early"],
    ],
    faqs: [],
  },
  "final-grade": {
    intro: "The Final Grade Calculator helps you plan your final exam strategy. Find out exactly what score you need on your final to achieve your desired grade.",
    formula: "Needed = (Desired - Current × (1 - Weight/100)) ÷ (Weight/100)",
    table: [
      ["Current 65%", "Desired 70%", "Weight 30%", "Need 81.7%"],
      ["Current 75%", "Desired 80%", "Weight 25%", "Need 95.0%"],
      ["Current 80%", "Desired 85%", "Weight 20%", "Need 100%"],
      ["Current 85%", "Desired 90%", "Weight 40%", "Need 97.5%"],
      ["Current 50%", "Desired 60%", "Weight 35%", "Need 78.6%"],
    ],
    faqs: [],
  },
  "apy": {
    intro: "The Annual Percentage Yield (APY) Calculator helps you calculate the true return on your savings or investments, including the effect of compound interest. Unlike simple interest rates, APY shows what you'll actually earn.",
    formula: "APY = (1 + r/n)^n - 1",
    table: [
      ["4%", "4.07%", "4.08%", "4.08%"],
      ["5%", "5.12%", "5.13%", "5.13%"],
      ["6%", "6.17%", "6.18%", "6.18%"],
      ["7%", "7.23%", "7.25%", "7.25%"],
      ["8%", "8.30%", "8.33%", "8.33%"],
    ],
    faqs: [],
  },
  "loan-comparison": {
    intro: "Compare two loans side by side to find the better deal. See EMI, total interest, and total payment including processing fees.",
    formula: "EMI = P × r × (1+r)^n / ((1+r)^n - 1)",
    table: [
      ["Check prepayment penalties", "Some loans charge 2-3% for early payment"],
      ["Compare processing fees", "Fees can range from 0.5% to 2%"],
      ["Look at foreclosure charges", "Floating rate loans have no foreclosure charges"],
    ],
    faqs: [],
  },
  "tip": {
    intro: "Calculate the perfect tip for restaurants, delivery, or any service. Split bills easily among friends.",
    formula: "Tip Amount = Bill Amount × (Tip % ÷ 100)",
    table: [
      ["10%", "Poor Service", "Slow or inattentive"],
      ["15%", "Standard Service", "Average decent service"],
      ["18%", "Good Service", "Attentive and friendly"],
      ["20%", "Excellent Service", "Went above and beyond"],
    ],
    faqs: [],
  },
  "sales-commission": {
    intro: "Calculate sales commissions for simple rates, tiered structures, or split commissions.",
    formula: "Commission = Sale Amount × Rate ÷ 100",
    table: [
      ["₹50,000", "5%", "₹2,500"],
      ["₹1,00,000", "8%", "₹8,000"],
      ["₹2,00,000", "10%", "₹20,000"],
    ],
    faqs: [],
  },
  "nutrition-label": {
    intro: "Create a professional nutrition facts label for your food products. Enter serving size, macros, and get % Daily Values.",
    formula: "% Daily Value = (Amount in serving ÷ Daily Value) × 100",
    table: [
      ["Total Fat", "78g", "Limit to 20% DV"],
      ["Sodium", "2300mg", "Limit to 5-20% DV"],
      ["Fiber", "28g", "Aim for 100% DV"],
      ["Protein", "50g", "Aim for 100% DV"],
    ],
    faqs: [],
  },
  "calorie-counter": {
    intro: "Track your daily calorie and macronutrient intake. Add foods manually or use our quick-add database.",
    formula: "Total Calories = Sum of all food calories | Carbs/Protein = 4 cal/g | Fat = 9 cal/g",
    table: [
      ["Apple (medium)", "95 cal", "0.5g protein", "25g carbs"],
      ["Chicken Breast (100g)", "165 cal", "31g protein", "0g carbs"],
      ["Egg (large)", "72 cal", "6g protein", "0.4g carbs"],
      ["Olive Oil (1 tbsp)", "119 cal", "0g protein", "0g carbs"],
    ],
    faqs: [],
  },
  "decimal": {
    intro: "Convert any decimal number to its fraction form instantly. Get simplified fractions and mixed numbers.",
    formula: "Write decimal as fraction over power of 10, then simplify",
    table: [
      ["0.5", "5/10", "1/2"],
      ["0.75", "75/100", "3/4"],
      ["0.333...", "333/1000", "1/3"],
      ["1.25", "125/100", "5/4 = 1 1/4"],
    ],
    faqs: [],
  },
  "ratio": {
    intro: "Simplify ratios, find missing values in proportions, and calculate aspect ratios. Perfect for students and designers.",
    formula: "a:b = c:d → ad = bc",
    table: [
      ["2:3", "4:6, 6:9, 8:12", "Photography"],
      ["16:9", "32:18, 48:27", "Widescreen"],
      ["4:3", "8:6, 12:9", "Standard TV"],
      ["1:1", "2:2, 3:3", "Square"],
    ],
    faqs: [],
  },
  "pythagorean": {
    intro: "Calculate the hypotenuse or missing leg of any right triangle using the Pythagorean theorem (a² + b² = c²).",
    formula: "a² + b² = c²",
    table: [
      ["3", "4", "5"],
      ["5", "12", "13"],
      ["6", "8", "10"],
      ["7", "24", "25"],
      ["8", "15", "17"],
    ],
    faqs: [],
  },
  "area": {
    intro: "Calculate the area of squares, rectangles, circles, triangles, parallelograms, and trapezoids.",
    formula: "Varies by shape",
    table: [
      ["Square", "side²", "side 5cm = 25cm²"],
      ["Rectangle", "length × width", "10×5 = 50cm²"],
      ["Circle", "π × r²", "r=5cm = 78.5cm²"],
      ["Triangle", "½ × base × height", "10×6 = 30cm²"],
    ],
    faqs: [],
  },
  "volume": {
    intro: "Calculate the volume of cubes, rectangular prisms, cylinders, spheres, and cones.",
    formula: "Varies by shape",
    table: [
      ["Cube", "side³", "side 5cm = 125cm³"],
      ["Rectangular Prism", "l × w × h", "10×5×4 = 200cm³"],
      ["Cylinder", "π × r² × h", "r=5,h=10 = 785cm³"],
      ["Sphere", "4/3 × π × r³", "r=6cm = 904cm³"],
    ],
    faqs: [],
  },
  "slope": {
    intro: "Calculate the slope between any two points, find the line equation, y-intercept, and angle of inclination.",
    formula: "m = (y₂ - y₁) / (x₂ - x₁)",
    table: [
      ["(1,2) and (4,8)", "2", "Positive slope"],
      ["(1,8) and (4,2)", "-2", "Negative slope"],
      ["(1,5) and (4,5)", "0", "Horizontal line"],
      ["(2,1) and (2,5)", "Undefined", "Vertical line"],
    ],
    faqs: [],
  },
  "mean-median-mode": {
    intro: "Calculate mean, median, mode, range, sum, min, max, and count for any dataset.",
    formula: "Mean = Σx / n | Median = middle value | Mode = most frequent",
    table: [
      ["2,4,6,8,10", "6", "6", "No mode"],
      ["1,2,2,3,3,3,4", "2.57", "3", "3"],
      ["10,20,30,40,50", "30", "30", "No mode"],
    ],
    faqs: [],
  },
  "distance": {
    intro: "Calculate the straight-line distance between any two points in 2D space.",
    formula: "d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
    table: [
      ["(0,0) and (3,4)", "5", "3-4-5 triangle"],
      ["(1,1) and (4,5)", "5", "3-4-5 triangle"],
      ["(0,0) and (0,5)", "5", "Vertical line"],
    ],
    faqs: [],
  },
  "length-converter": {
    intro: "Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
    formula: "Value in meters = Value × conversion factor",
    table: [
      ["1 inch", "2.54 cm", "0.0254 m"],
      ["1 foot", "30.48 cm", "0.3048 m"],
      ["1 mile", "1.609 km", "1609 m"],
    ],
    faqs: [],
  },
  "weight-converter": {
    intro: "Convert between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.",
    formula: "Value in kg = Value × conversion factor",
    table: [
      ["1 kg", "2.20462 lbs", "35.274 oz"],
      ["1 lb", "0.4536 kg", "16 oz"],
      ["1 oz", "28.3495 g", "0.02835 kg"],
    ],
    faqs: [],
  },
  "temperature-converter": {
    intro: "Convert between Celsius, Fahrenheit, and Kelvin.",
    formula: "°F = (°C × 9/5) + 32 | K = °C + 273.15",
    table: [
      ["0°C", "32°F", "273.15 K"],
      ["100°C", "212°F", "373.15 K"],
      ["37°C", "98.6°F", "310.15 K"],
    ],
    faqs: [],
  },
  "area-converter": {
    intro: "Convert between square meters, square feet, acres, hectares, and more.",
    formula: "Value in m² = Value × conversion factor",
    table: [
      ["1 m²", "10.7639 ft²", "0.000247 acres"],
      ["1 acre", "43,560 ft²", "4046.86 m²"],
      ["1 hectare", "2.471 acres", "10,000 m²"],
    ],
    faqs: [],
  },
  "volume-converter": {
    intro: "Convert between liters, milliliters, gallons, quarts, pints, cups, and fluid ounces.",
    formula: "Value in liters = Value × conversion factor",
    table: [
      ["1 L", "0.264 gal", "33.814 fl oz"],
      ["1 gal", "3.785 L", "128 fl oz"],
      ["1 cup", "236.588 ml", "8 fl oz"],
    ],
    faqs: [],
  },
  "speed-converter": {
    intro: "Convert between km/h, mph, m/s, knots, and ft/s.",
    formula: "Value in km/h = Value × conversion factor",
    table: [
      ["100 km/h", "62.14 mph", "27.78 m/s"],
      ["60 mph", "96.56 km/h", "26.82 m/s"],
      ["1 knot", "1.852 km/h", "1.151 mph"],
    ],
    faqs: [],
  },
  "time-converter": {
    intro: "Convert between milliseconds, seconds, minutes, hours, days, weeks, months, and years.",
    formula: "Value in seconds = Value × conversion factor",
    table: [
      ["1 hour", "60 min", "3600 sec"],
      ["1 day", "24 hours", "1440 min"],
      ["1 year", "365 days", "8760 hours"],
    ],
    faqs: [],
  },
  "data-converter": {
    intro: "Convert between bits, bytes, KB, MB, GB, TB, and PB.",
    formula: "Value in bytes = Value × conversion factor (using 1024)",
    table: [
      ["1 KB", "1024 bytes", "0.00098 MB"],
      ["1 MB", "1024 KB", "0.00098 GB"],
      ["1 GB", "1024 MB", "0.00098 TB"],
    ],
    faqs: [],
  },
  "pressure-converter": {
    intro: "Convert between Pascal, kPa, MPa, bar, PSI, atmosphere, and torr.",
    formula: "Value in Pascal = Value × conversion factor",
    table: [
      ["1 bar", "14.5 PSI", "100 kPa"],
      ["1 atm", "14.7 PSI", "101.325 kPa"],
      ["1 PSI", "6894.76 Pa", "0.06895 bar"],
    ],
    faqs: [],
  },
  "energy-converter": {
    intro: "Convert between joules, calories, kilocalories, watt-hours, kilowatt-hours, and electronvolts.",
    formula: "Value in joules = Value × conversion factor",
    table: [
      ["1 cal", "4.184 J", "0.001 kcal"],
      ["1 kWh", "3.6 MJ", "860 kcal"],
      ["1 eV", "1.602 × 10⁻¹⁹ J", "3.83 × 10⁻²⁰ cal"],
    ],
    faqs: [],
  },
  "power-converter": {
    intro: "Convert between watts, kilowatts, megawatts, horsepower, and BTU per hour.",
    formula: "Value in watts = Value × conversion factor",
    table: [
      ["1 kW", "1.341 HP", "1000 W"],
      ["1 HP", "745.7 W", "0.7457 kW"],
      ["1 MW", "1000 kW", "1341 HP"],
    ],
    faqs: [],
  },
  "angle-converter": {
    intro: "Convert between degrees, radians, gradians, arcminutes, and arcseconds.",
    formula: "Value in degrees = Value × conversion factor",
    table: [
      ["180°", "π rad", "200 gon"],
      ["90°", "π/2 rad", "100 gon"],
      ["1 rad", "57.2958°", "63.662 gon"],
    ],
    faqs: [],
  },
  "gst": {
    intro: "GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services across India. It replaced multiple taxes like VAT, service tax, and excise duty.",
    formula: "GST Amount = Original Price × (GST Rate / 100)",
    formulaUS: "Total Price = Original Price + GST Amount",
    table: [
      ["0%", "Essential items – rice, wheat, vegetables"],
      ["5%", "Household necessities – sugar, edible oil"],
      ["12%", "Processed foods, smartphones, computers"],
      ["18%", "Most services, electronics, FMCG products"],
      ["28%", "Luxury goods, automobiles, tobacco"],
    ],
    faqs: [],
  },
  "add-days": {
    intro: "Calculate future or past dates by adding or subtracting days. Perfect for deadlines, project planning, and due dates.",
    formula: "New Date = Start Date ± Days",
    table: [
      ["Today + 30 days", "One month from now"],
      ["Today + 90 days", "Three months from now"],
      ["Today + 365 days", "One year from now"],
    ],
    faqs: [],
  },
  "work-days": {
    intro: "Calculate the number of working days (Monday-Friday) between any two dates. Perfect for project planning and delivery estimates.",
    formula: "Working Days = Total Days - Weekends",
    table: [
      ["Monday to Friday", "5 working days"],
      ["Monday to next Monday", "6 working days"],
      ["January 2024", "23 working days"],
    ],
    faqs: [],
  },
  "time-duration": {
    intro: "Calculate duration between two times, or add/subtract hours and minutes from a base time.",
    formula: "Duration = End Time - Start Time",
    table: [
      ["9:00 AM to 5:00 PM", "8 hours"],
      ["10:00 PM to 6:00 AM", "8 hours (overnight)"],
      ["9:00 AM + 3h30m", "12:30 PM"],
    ],
    faqs: [],
  },
  "birthday-countdown": {
    intro: "Count down the days until your next birthday. Also find your exact age and zodiac sign.",
    formula: "Days Until = Next Birthday - Today",
    table: [
      ["Today to birthday", "Countdown days"],
      ["Age calculation", "Years, months, days"],
      ["Zodiac signs", "Based on birth date"],
    ],
    faqs: [],
  },
  "stopwatch": {
    intro: "Free online stopwatch with lap timing. Accurate to 10 milliseconds. Perfect for workouts and timing events.",
    formula: "Elapsed Time = Current Time - Start Time",
    table: [
      ["Start/Pause/Reset", "Basic controls"],
      ["Lap timing", "Record split times"],
      ["Millisecond accuracy", "0.01 second precision"],
    ],
    faqs: [],
  },
  "timer": {
    intro: "Free online countdown timer. Set hours, minutes, and seconds. Get alerts when time is up.",
    formula: "Time Remaining = Set Time - Elapsed Time",
    table: [
      ["1 minute", "60 seconds"],
      ["5 minutes", "300 seconds"],
      ["1 hour", "3600 seconds"],
    ],
    faqs: [],
  },
  "time-zone-converter": {
    intro: "Convert time between any two time zones. Perfect for international meetings and travel planning.",
    formula: "Converted Time = Original Time ± Time Zone Difference",
    table: [
      ["New York to London", "+5 hours"],
      ["London to New York", "-5 hours"],
      ["India (IST) to New York", "-9.5 hours"],
    ],
    faqs: [],
  },
  "carpet-area": {
    intro: "Calculate the actual usable carpet area of your property. Essential for home buyers to verify builder claims.",
    formula: "Carpet Area = Length × Width (sum of all rooms)",
    table: [
      ["Living Room", "15×12 = 180 sq ft"],
      ["Bedroom 1", "12×10 = 120 sq ft"],
      ["Bedroom 2", "12×10 = 120 sq ft"],
      ["Total Carpet Area", "420 sq ft"],
    ],
    faqs: [],
  },
  "built-up-area": {
    intro: "Calculate built-up area from carpet area including wall thickness and balcony.",
    formula: "Built-up Area = Carpet Area × (1 + Wall Factor) + Balcony",
    table: [
      ["Carpet Area", "Wall Factor (18%)", "Built-up Area"],
      ["1000 sq ft", "1.18", "1180 sq ft"],
      ["1500 sq ft", "1.18", "1770 sq ft"],
    ],
    faqs: [],
  },
  "paint": {
    intro: "Estimate how much paint you need for your room. Includes walls, ceiling, doors, and windows.",
    formula: "Paint (liters) = Area × Coats ÷ Coverage",
    table: [
      ["Room Size", "Wall Area", "Paint Needed (2 coats)"],
      ["10×12 ft", "~350 sq ft", "~7 liters"],
      ["12×15 ft", "~450 sq ft", "~9 liters"],
    ],
    faqs: [],
  },
  "flooring": {
    intro: "Calculate how many tiles or flooring planks you need for any room.",
    formula: "Tiles Needed = Room Area ÷ Tile Area × (1 + Waste%)",
    table: [
      ["Room Size", "Tile Size", "Tiles Needed (with waste)"],
      ["10×10 ft", "12×12 in", "110 tiles"],
      ["12×15 ft", "18×18 in", "100 tiles"],
    ],
    faqs: [],
  },
  "wallpaper": {
    intro: "Estimate how many wallpaper rolls you need for your room.",
    formula: "Rolls Needed = Wall Area ÷ Roll Coverage × (1 + Waste%)",
    table: [
      ["Room Size", "Wall Area", "Rolls Needed"],
      ["10×10×8 ft", "~320 sq ft", "~7 rolls"],
      ["12×12×8 ft", "~380 sq ft", "~8 rolls"],
    ],
    faqs: [],
  },
  "roofing": {
    intro: "Calculate roof area including pitch factor. Estimate roofing sheets needed.",
    formula: "Sloped Area = Flat Area × Pitch Factor",
    table: [
      ["Pitch", "Factor", "Example (1000 sq ft flat)"],
      ["4/12", "1.05", "1050 sq ft"],
      ["6/12", "1.12", "1120 sq ft"],
      ["8/12", "1.20", "1200 sq ft"],
    ],
    faqs: [],
  },
  "land-area": {
    intro: "Calculate land area for rectangular, triangular, or circular plots. Convert between multiple units.",
    formula: "Rectangle: L × W | Triangle: ½ × B × H | Circle: π × r²",
    table: [
      ["Unit", "Square Feet", "Square Yards"],
      ["1 Acre", "43,560", "4,840"],
      ["1 Ground", "2,400", "266.67"],
      ["1 Cent", "435.6", "48.4"],
    ],
    faqs: [],
  },
  "recipe-converter": {
    intro: "Scale recipes up or down for any number of servings. Convert between measurement units like cups to ml, grams to ounces.",
    formula: "Scaling Factor = New Servings ÷ Original Servings",
    table: [
      ["Double recipe", "×2 all ingredients", "2x servings"],
      ["Half recipe", "÷2 all ingredients", "0.5x servings"],
      ["1 cup = 240 ml", "1 tbsp = 15 ml", "1 tsp = 5 ml"],
    ],
    faqs: [],
  },
  "cooking-time": {
    intro: "Adjust cooking times for temperature changes, quantity scaling, pan size, and altitude.",
    formula: "New Time = Original Time × (Original Temp ÷ New Temp)",
    table: [
      ["350°F to 375°F", "30 min → 28 min", "-7% time"],
      ["350°F to 325°F", "30 min → 32 min", "+7% time"],
      ["Double recipe", "+15-20% time", "Baked goods"],
    ],
    faqs: [],
  },
  "oven-temperature": {
    intro: "Convert oven temperatures between Celsius, Fahrenheit, and Gas Mark.",
    formula: "°F = (°C × 9/5) + 32 | °C = (°F - 32) × 5/9",
    table: [
      ["Cakes", "180°C", "350°F", "Gas 4"],
      ["Bread", "200°C", "400°F", "Gas 6"],
      ["Roast Meat", "190°C", "375°F", "Gas 5"],
    ],
    faqs: [],
  },
  "baking-converter": {
    intro: "Convert common baking ingredients from cups to grams and grams to cups.",
    formula: "Grams = Cups × Ingredient Density | Cups = Grams ÷ Ingredient Density",
    table: [
      ["All-Purpose Flour", "1 cup = 125g", "125g = 1 cup"],
      ["Granulated Sugar", "1 cup = 200g", "200g = 1 cup"],
      ["Butter", "1 cup = 227g", "227g = 1 cup"],
      ["Cocoa Powder", "1 cup = 100g", "100g = 1 cup"],
    ],
    faqs: [],
  },
  "food-expiry": {
    intro: "Check how long different foods last in the refrigerator or freezer.",
    formula: "Based on FDA and USDA food safety guidelines",
    table: [
      ["Cooked Leftovers", "3-4 days", "2-3 months"],
      ["Raw Chicken", "1-2 days", "9-12 months"],
      ["Eggs", "3-5 weeks", "Not recommended"],
      ["Milk", "5-7 days", "3 months"],
    ],
    faqs: [],
  },
  "water-bill": {
    intro: "Estimate your monthly water bill based on consumption, tiered rates, and service charges.",
    formula: "Total Bill = (Usage × Rate) + Fixed Charge + Sewer Charge",
    table: [
      ["1 person", "3,600 gal", "$35-50"],
      ["2 persons", "6,000 gal", "$50-70"],
      ["3 persons", "9,000 gal", "$70-95"],
      ["4 persons", "12,000 gal", "$90-120"],
    ],
    faqs: [],
  },
  "travel-budget": {
    intro: "Plan your trip budget by estimating costs for flights, accommodation, food, activities, and more. Get per day and per person breakdowns.",
    formula: "Total Budget = Sum of all expenses | Per Day = Total ÷ Days",
    table: [
      ["Southeast Asia", "$20-40", "$40-80", "$100-200"],
      ["Europe", "$50-80", "$80-150", "$200-400"],
      ["USA/Canada", "$50-80", "$100-200", "$250-500"],
    ],
    faqs: [],
  },
  "flight-time": {
    intro: "Estimate flight duration based on distance and aircraft speed. Includes extra time for takeoff, landing, and taxiing.",
    formula: "Flight Time = Distance ÷ Speed + Extra Time",
    table: [
      ["New York → London", "3450 miles", "7h 15m"],
      ["Los Angeles → Tokyo", "5470 miles", "11h 30m"],
      ["Mumbai → London", "4470 miles", "9h 15m"],
    ],
    faqs: [],
  },
  "hotel-cost": {
    intro: "Calculate total hotel stay cost including taxes and fees. Split costs between travelers easily.",
    formula: "Total = (Price/Night × Nights) + Taxes + Fees",
    table: [
      ["New York", "$150-250", "$250-400", "$500+"],
      ["London", "$100-200", "$200-350", "$400+"],
      ["Tokyo", "$80-150", "$150-250", "$350+"],
    ],
    faqs: [],
  },
  "luggage-allowance": {
    intro: "Check baggage allowances for major airlines and calculate excess baggage fees before you fly.",
    formula: "Excess Fee = (Extra Weight × Rate) + (Extra Bags × Bag Fee)",
    table: [
      ["Emirates", "2x23kg", "1x7kg", "Personal item"],
      ["American Airlines", "1x23kg", "1 bag + personal", "22x14x9 in"],
      ["Ryanair", "Paid only", "1 small bag", "40x20x25 cm"],
    ],
    faqs: [],
  },

  "capm": {
    intro: "Calculate the expected return of a security using the Capital Asset Pricing Model (CAPM). Essential for investors to assess risk vs. reward.",
    formula: "Expected Return = Risk-Free Rate + Beta × (Market Return – Risk-Free Rate)",
    table: [
      ["Asset", "Beta", "Risk-Free Rate", "Market Return", "Expected Return"],
      ["Stock A", "1.2", "3%", "8%", "9.0%"],
      ["Stock B", "0.8", "3%", "8%", "7.0%"],
      ["Stock C", "1.5", "3%", "8%", "10.5%"],
    ],
    faqs: [],
  },

  "xirr": {
    intro: "Compute the annualized return on irregular cash flows (e.g., SIPs, dividends, redemptions). XIRR is the most accurate metric for real-world investments.",
    formula: "XIRR = Discount rate that makes net present value of all cash flows equal to zero. Σ (Cash flowᵢ / (1+XIRR)^((dateᵢ – start_date)/365)) = 0",
    table: [
      ["Date", "Cash Flow (₹)", "Description"],
      ["01-Apr-2023", "-10,000", "Initial investment"],
      ["15-Jun-2023", "-5,000", "Additional purchase"],
      ["10-Jan-2024", "18,000", "Redemption"],
    ],
    faqs: [],
  },

  "property-tax": {
    intro: "Estimate annual property tax based on property type, location (municipal zone), built‑up area, and applicable rates. Avoid penalties with accurate tax planning.",
    formula: "Property Tax = (Base Value × Area × Age Factor × Usage Factor × Structure Factor) + Cess + Surcharge",
    table: [
      ["City", "Rate per sq.ft", "Annual Tax (1000 sq.ft)", "Late Fee"],
      ["Mumbai", "₹12", "₹12,000", "2% per month"],
      ["Delhi", "₹9", "₹9,000", "1.5% per month"],
      ["Bangalore", "₹7", "₹7,000", "1% per month"],
    ],
    faqs: [],
  },

  "rental-yield": {
    intro: "Measure the annual return on a rental property as a percentage of its market value. Compare properties and decide if an investment makes sense.",
    formula: "Rental Yield (%) = (Annual Rental Income ÷ Property Value) × 100",
    table: [
      ["City", "Avg Property Price", "Monthly Rent", "Gross Rental Yield"],
      ["Mumbai", "₹1.2 Cr", "₹40,000", "4.0%"],
      ["Chennai", "₹60 Lakh", "₹25,000", "5.0%"],
      ["Pune", "₹80 Lakh", "₹30,000", "4.5%"],
    ],
    faqs: [],
  },
  "college-cost": {
    intro: "Plan your education budget by calculating total college expenses including tuition, housing, books, and other fees. Adjust for inflation to see the real cost over multiple years.",
    formula: "Total College Cost = Σ (Annual Cost × (1 + Inflation Rate)^Year) for Year = 0 to N-1",
    table: [
      ["College Type", "Avg Annual Tuition", "Room & Board", "Total (4 Years)"],
      ["Government College", "₹30,000", "₹50,000", "₹3.2 Lakh"],
      ["Private College", "₹2,00,000", "₹1,00,000", "₹12 Lakh"],
      ["Professional Course", "₹5,00,000", "₹1,20,000", "₹25 Lakh"],
      ["Medical College", "₹8,00,000", "₹1,50,000", "₹38 Lakh"],
    ],
    faqs: [],
  },
  "student-loan": {
    intro: "Calculate monthly student loan payments, total interest cost, and see how extra payments can save you money and reduce your loan term significantly.",
    formula: "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1) where P = Principal, r = Monthly Interest Rate, n = Months",
    table: [
      ["Loan Amount", "Interest Rate", "Term (Years)", "Monthly EMI", "Total Interest"],
      ["₹5,00,000", "8%", "10", "₹6,066", "₹2,28,000"],
      ["₹10,00,000", "8%", "10", "₹12,132", "₹4,56,000"],
      ["₹15,00,000", "8.5%", "15", "₹14,765", "₹11,57,700"],
      ["₹25,00,000", "9%", "20", "₹22,493", "₹28,98,320"],
    ],
    faqs: [],
  },
  "scholarship": {
    intro: "Track all your scholarships, grants, and financial aid to understand your true out-of-pocket college costs. Identify funding gaps and plan accordingly.",
    formula: "Remaining Cost = Total College Cost - (Total Scholarships + Grants + Work Study + Family Contribution)",
    table: [
      ["Scholarship Type", "Average Amount", "Eligibility", "Renewable"],
      ["Merit-Based", "₹50,000 - ₹2,00,000", "85%+ Academics", "Yes"],
      ["Need-Based", "₹25,000 - ₹1,00,000", "Family Income < ₹8 Lakh", "Yes"],
      ["Sports Quota", "₹30,000 - ₹1,50,000", "State/National Level", "Yes"],
      ["Minority Scholarship", "₹20,000 - ₹60,000", "SC/ST/OBC Category", "Yes"],
    ],
    faqs: [],
  },
  "attendance": {
    intro: "Track your attendance percentage, find out how many more classes you need to meet requirements, and plan your attendance strategy for exams.",
    formula: "Attendance % = (Total Classes Attended ÷ Total Classes Held) × 100",
    table: [
      ["Classes Held", "Classes Attended", "Current %", "Need to Reach 75%"],
      ["30", "20", "66.7%", "10 more classes"],
      ["45", "35", "77.8%", "Already above 75%"],
      ["60", "40", "66.7%", "20 more classes"],
      ["80", "55", "68.8%", "25 more classes"],
    ],
    faqs: [],
  },
  "percentage-marks": {
    intro: "Calculate percentage from marks for single or multiple subjects. Also convert CGPA to percentage using standard conversion formulas.",
    formula: "Percentage = (Marks Obtained ÷ Total Marks) × 100 | CGPA to % = CGPA × 9.5",
    table: [
      ["Marks Obtained", "Total Marks", "Percentage", "Grade"],
      ["450", "500", "90%", "A+ (Outstanding)"],
      ["400", "500", "80%", "A (Excellent)"],
      ["350", "500", "70%", "B+ (Very Good)"],
      ["300", "500", "60%", "B (Good)"],
    ],
    faqs: [],
  },
  "pace": {
    intro: "Calculate running pace, race time, or distance for your workouts. Perfect for runners, cyclists, and walkers to plan training and predict race times.",
    formula: "Pace = Time ÷ Distance | Time = Distance × Pace | Distance = Time ÷ Pace",
    table: [
      ["Distance", "Time (Beginner)", "Time (Intermediate)", "Time (Advanced)"],
      ["5 km", "40-45 min", "25-30 min", "18-22 min"],
      ["10 km", "80-90 min", "50-60 min", "35-45 min"],
      ["Half Marathon", "2:45-3:00 hr", "1:45-2:00 hr", "1:20-1:35 hr"],
      ["Marathon", "5:30-6:00 hr", "3:30-4:00 hr", "2:45-3:15 hr"],
    ],
    faqs: [],
  },
  "distance-speed-time": {
    intro: "Calculate speed, distance, or time using the fundamental physics formula. Perfect for travel planning, running, cycling, driving, and physics problems.",
    formula: "Speed = Distance ÷ Time | Distance = Speed × Time | Time = Distance ÷ Speed",
    table: [
      ["Mode", "Avg Speed", "Distance", "Time"],
      ["Walking", "4 km/h", "10 km", "2 hr 30 min"],
      ["Cycling", "18 km/h", "50 km", "2 hr 47 min"],
      ["Car (City)", "35 km/h", "100 km", "2 hr 51 min"],
      ["Car (Highway)", "80 km/h", "300 km", "3 hr 45 min"],
    ],
    faqs: [],
  },
  "invoice": {
    intro: "Create professional invoices for your business. Add items, apply discounts and taxes, and print or download as PDF. Perfect for freelancers and small businesses.",
    formula: "Total = Subtotal - Discount + Tax | Tax = (Subtotal - Discount) × Tax Rate | Discount = Subtotal × (Discount% / 100) or Fixed Amount",
    table: [
      ["Service", "Typical Rate", "GST", "Common Terms"],
      ["Freelance Writing", "₹500-2000/page", "18%", "Net 15"],
      ["Web Development", "₹20,000-1,00,000", "18%", "50% Advance"],
      ["Consulting", "₹2,000-5,000/hr", "18%", "Net 30"],
      ["Design Services", "₹5,000-50,000", "18%", "Net 15"],
    ],
    faqs: [],
  },
  // Default for any calculator without specific SEO
  default: {
    intro: "This calculator provides accurate results for your needs. Enter your values and press calculate to get instant results.",
    formula: "Please refer to the specific formula for this calculation.",
    table: [],
    faqs: [],
  },
};
