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
  finance: { name: 'Finance & Investment', icon: '💰', order: 3, basePath: '/finance' },
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
  { id: "quadratic", slug: "quadratic-calculator", name: "Quadratic Solver", icon: "✖️", color: "#ef4444", bg: "rgba(239,68,68,0.1)", desc: "Solve quadratic equations", tags: ["Algebra", "New"], category: "math", path: generatePath("math", "quadratic-calculator"), popularity: 72, isNew: true },
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
  { id: "clock", slug: "clock", name: "World Clock", icon: "🌍", color: "#14b8a6", bg: "rgba(20,184,166,0.1)", desc: "Time zones converter", tags: ["Time", "New"], category: "time", path: generatePath("time", "clock"), popularity: 65, isNew: true },

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
  { id: "accommodation-cost", slug: "accommodation-cost-calculator", name: "Hotel Cost", icon: "🏨", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", desc: "Calculate hotel expense", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "accommodation-cost-calculator"), popularity: 72, isNew: true },
  { id: "luggage", slug: "luggage-allowance-calculator", name: "Luggage Allowance", icon: "🧳", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", desc: "Check baggage limits", tags: ["Travel", "New"], category: "travel", path: generatePath("travel", "luggage-allowance-calculator"), popularity: 68, isNew: true },

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
    faqs: [
      { q: "What is a healthy BMI range for adults?", a: "For adults (20 years and older), a BMI between 18.5 and 24.9 is considered normal and healthy by the WHO and CDC." },
      { q: "Is BMI accurate for athletes and muscular individuals?", a: "BMI can overestimate fatness in people with high muscle mass, like athletes and bodybuilders." },
      { q: "Is BMI the same for men and women?", a: "The BMI formula is the same, but body fat distribution differs." },
      { q: "What should I do if my BMI is high?", a: "Consult a healthcare professional. A combination of balanced diet and regular physical activity can help." },
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
    faqs: [
      { q: "What is BMR and why is it important?", a: "BMR represents the minimum calories your body needs at rest. It's the foundation for weight management." },
      { q: "How accurate is the BMR formula?", a: "The Mifflin-St Jeor equation is 90-95% accurate for most people." },
      { q: "Can I increase my BMR?", a: "Yes! Building muscle mass through strength training increases BMR." },
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
    faqs: [
      { q: "What is a healthy body fat percentage?", a: "For men: 18-24%, For women: 25-31% is considered average/healthy." },
      { q: "How accurate is the US Navy method?", a: "95-98% accurate compared to hydrostatic weighing when measured correctly." },
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
    faqs: [
      { q: "How accurate is calorie burn calculation?", a: "Within 85-95% accuracy using MET values." },
      { q: "What exercises burn the most calories?", a: "Running, jumping rope, HIIT, and swimming burn the most." },
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
    faqs: [
      { q: "What factors affect my EMI?", a: "Loan amount, interest rate, and tenure affect your EMI." },
      { q: "Can I reduce my EMI?", a: "Yes, by making partial prepayments or refinancing at lower rates." },
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
    faqs: [
      { q: "What is the minimum SIP amount?", a: "Most mutual funds allow SIPs starting from just ₹500 per month." },
      { q: "Is SIP good for long-term wealth creation?", a: "Yes! SIPs are excellent for long-term wealth creation through compounding." },
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
    faqs: [
      { q: "Is FD interest taxable?", a: "Yes, FD interest is fully taxable as per your income slab." },
      { q: "What is the difference between cumulative and non-cumulative FD?", a: "Cumulative reinvests interest, non-cumulative pays out periodically." },
    ],
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
    faqs: [
      { q: "What is the current PPF interest rate?", a: "Current rate is 7.1% per annum (compounded annually)." },
      { q: "What is the PPF lock-in period?", a: "15-year lock-in period with partial withdrawals allowed from year 7." },
    ],
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
    faqs: [
      { q: "How to calculate percentage of a number?", a: "Multiply the number by the percentage divided by 100." },
      { q: "How to calculate percentage increase?", a: "((New - Original) ÷ Original) × 100" },
    ],
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
    faqs: [
      { q: "Does the calculator account for leap years?", a: "Yes, our age calculator automatically accounts for leap years." },
      { q: "How is my exact age calculated?", a: "By subtracting your birth date from the current date." },
    ],
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
    faqs: [
      { q: "How accurate are the exchange rates?", a: "Our rates are updated daily from leading financial institutions." },
      { q: "What affects currency exchange rates?", a: "Interest rates, inflation, political stability, and economic growth." },
    ],
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
    faqs: [
      { q: "How do I convert between metric and imperial?", a: "Our unit converter handles all metric-imperial conversions automatically." },
      { q: "What's the difference between mass and weight?", a: "Mass measures matter, weight measures gravitational force." },
    ],
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
    faqs: [
      { q: "How much water should I drink daily?", a: "General recommendation is 2.7-3.7 liters, but individual needs vary by weight and activity." },
      { q: "Does coffee count as water?", a: "Yes, moderate caffeine contributes to hydration, but water should be your primary source." },
      { q: "What are signs of dehydration?", a: "Dry mouth, dark urine, headache, fatigue, and dizziness are common signs." },
    ],
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
    faqs: [
      { q: "How much sleep do I need?", a: "Most adults need 7-9 hours. Teens need 8-10 hours, school children 9-11 hours." },
      { q: "What is a sleep cycle?", a: "A 90-minute cycle including light sleep, deep sleep, and REM sleep." },
      { q: "Is 6 hours of sleep enough?", a: "Only 1% of people have a gene allowing 6 hours without impairment. Most need 7-9 hours." },
    ],
  },

  "ideal-weight": {
    intro: "Find your ideal body weight using multiple medical formulas. The Robinson formula is recommended for general use, while Devine remains the medical standard.",
    formula: "Men: 52 kg + 1.9 kg per inch over 5 feet | Women: 49 kg + 1.7 kg per inch over 5 feet",
    table: [
      ["Devine (Medical)", "50kg + 2.3kg/inch", "45.5kg + 2.3kg/inch"],
      ["Robinson (Recommended)", "52kg + 1.9kg/inch", "49kg + 1.7kg/inch"],
      ["Miller (Nutrition)", "56.2kg + 1.41kg/inch", "53.1kg + 1.36kg/inch"],
    ],
    faqs: [
      { q: "What is ideal body weight?", a: "An estimate of optimal weight based on height and gender, originally for medical dosing." },
      { q: "Does body frame affect ideal weight?", a: "Yes, larger frames weigh about 10% more than smaller frames." },
      { q: "Which formula is most accurate?", a: "The Robinson formula is recommended for general population use." },
    ],
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
    faqs: [
      { q: "How do I know when I'm ovulating?", a: "Look for changes in cervical mucus, slight temperature rise, or mild cramping." },
      { q: "Can I get pregnant outside my fertile window?", a: "No - you need a live egg. Sperm can survive up to 5 days, so the window is about 6 days total." },
      { q: "What if my cycles are irregular?", a: "Track physical signs like cervical mucus or use ovulation test strips for more accuracy." },
    ],
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
    faqs: [
      { q: "Why does body type matter?", a: "It helps tailor fitness and nutrition plans for your specific body shape." },
      { q: "Can body type change?", a: "Yes, weight loss/gain and muscle building can change your proportions over time." },
    ],
  },

  "pregnancy-due": {
    intro: "Calculate your expected due date based on your last menstrual period or conception date. This is an estimate - only 5% of babies arrive exactly on their due date.",
    formula: "Due Date = LMP + 280 days (40 weeks)",
    table: [
      ["First day of LMP", "Due date (40 weeks)", "Early term (37 weeks)", "Full term (39 weeks)"],
      ["Jan 1", "Oct 8", "Sep 24", "Oct 8"],
      ["Feb 1", "Nov 8", "Oct 25", "Nov 8"],
    ],
    faqs: [
      { q: "How accurate is the due date?", a: "Due dates are estimates. Only 5% of babies arrive exactly on their due date." },
      { q: "What's the difference between LMP and conception date?", a: "LMP is easier to know. Conception happens about 2 weeks after LMP." },
    ],
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
    faqs: [
      { q: "What is a lumpsum investment?", a: "A one-time investment of a large amount, ideal for bonuses or inheritances." },
      { q: "Lumpsum vs SIP?", a: "Lumpsum works well in bull markets. SIP is better for rupee cost averaging in volatile markets." },
    ],
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
    faqs: [
      { q: "What is the minimum RD amount?", a: "Most banks allow RD starting from ₹500-₹1000 per month." },
      { q: "Can I withdraw RD before maturity?", a: "Yes, but with penalty (0.5-1% lower interest)." },
    ],
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
    faqs: [
      { q: "What is a good CAGR?", a: "Equity: 12-15%, Debt: 7-8%, FD: 6-7% are considered good." },
      { q: "CAGR vs absolute return?", a: "CAGR accounts for time, absolute return doesn't." },
    ],
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
    faqs: [
      { q: "What are NPS tax benefits?", a: "Employee contribution up to 10% of salary, plus additional ₹50,000 deduction under 80CCD(1B)." },
      { q: "Can I withdraw NPS before retirement?", a: "Partial withdrawal up to 25% after 3 years for specific needs like home, education, or medical treatment." },
    ],
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
    faqs: [
      { q: "What is the 4% rule?", a: "Withdraw 4% of corpus in year 1, adjust for inflation. Designed to last 30+ years." },
      { q: "How long will my SWP last?", a: "Depends on withdrawal rate and investment returns. Lower withdrawal = longer lasting." },
    ],
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
    faqs: [
      { q: "How do banks decide eligibility?", a: "Income, existing EMIs, credit score, and loan tenure affect your eligibility." },
      { q: "Does credit score matter?", a: "Yes, a score above 750 can increase eligible amount by 10-15%." },
    ],
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
    faqs: [
      { q: "Who is eligible for gratuity?", a: "Anyone with 5+ continuous years with the same employer." },
      { q: "What is the maximum gratuity?", a: "Tax-free limit is ₹20 lakhs. Anything above is taxable." },
    ],
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
    faqs: [
      { q: "How does EPF work?", a: "You contribute 12%, employer contributes 12% (3.67% to EPF, 8.33% to pension)." },
      { q: "Can I withdraw EPF early?", a: "Yes for home purchase, medical emergency, marriage, or higher education after certain years." },
    ],
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
    faqs: [
      { q: "How to add fractions?", a: "Find common denominator, add numerators, then simplify." },
      { q: "How to simplify fractions?", a: "Divide numerator and denominator by their greatest common divisor (GCD)." },
    ],
  },

  quadratic: {
    intro: "Solve quadratic equations ax² + bx + c = 0. Get real and complex roots with step-by-step solutions.",
    formula: "x = [-b ± √(b² - 4ac)] / (2a)",
    table: [
      ["x² - 3x + 2 = 0", "x = 2, x = 1"],
      ["x² + 2x - 8 = 0", "x = 2, x = -4"],
      ["x² - 4 = 0", "x = 2, x = -2"],
    ],
    faqs: [
      { q: "What is a quadratic equation?", a: "ax² + bx + c = 0 where a isn't zero." },
      { q: "What does discriminant tell me?", a: "Positive = 2 real solutions, Zero = 1 solution, Negative = complex numbers." },
    ],
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
    faqs: [
      { q: "What is a good profit margin?", a: "Depends on industry. Software: 70-80%, Retail: 20-30%, Food: 10-15%." },
      { q: "Markup vs margin?", a: "Margin = Profit ÷ Revenue, Markup = Profit ÷ Cost." },
    ],
  },

  discount: {
    intro: "Calculate sale prices instantly. Find final price after percentage off or fixed amount discount. Perfect for shopping and budgeting.",
    formula: "Final Price = Original Price × (1 - Discount % ÷ 100)",
    table: [
      ["20% off ₹1000", "₹800 (Save ₹200)"],
      ["₹200 off ₹1000", "₹800 (Save ₹200)"],
      ["Buy 1 Get 1", "50% off on total"],
    ],
    faqs: [
      { q: "How to calculate discounted price?", a: "Multiply original price by (100 - discount%) ÷ 100." },
      { q: "What is a good discount?", a: "Clearance: 40-70%, Seasonal: 20-40%, Flash sales: 30-50%." },
    ],
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
    faqs: [
      { q: "What is a good GPA?", a: "3.5-4.0 = Excellent, 3.0-3.4 = Good, 2.5-2.9 = Average." },
      { q: "How to calculate GPA from percentage?", a: "Convert to grade points using your institution's scale." },
    ],
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
    faqs: [
      { q: "How much concrete for a slab?", a: "Length × Width × Thickness. Always add 10% extra for waste." },
      { q: "How many cement bags per m³?", a: "For M20 grade, about 8 bags of 50kg cement per cubic meter." },
    ],
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
    faqs: [
      { q: "How to calculate fuel cost?", a: "Distance × Fuel Price ÷ Mileage = Total fuel cost for the trip." },
      { q: "What is good fuel economy?", a: "Cars: 15-20 km/l good, 20-25+ excellent. SUVs: 10-15 km/l." },
    ],
  },

  // Time Calculators
  "date-difference": {
    intro: "Calculate the exact difference between any two dates. Perfect for age calculation, project planning, or countdown to events.",
    formula: "Days Difference = |Date2 - Date1| / (1000 × 60 × 60 × 24)",
    table: [
      ["Jan 1 to Dec 31", "364-365 days", "52 weeks"],
      ["Birth to 18 years", "6,570 days", "~18 years"],
    ],
    faqs: [
      { q: "How to calculate days between dates?", a: "Simply subtract the earlier date from the later date. Our calculator handles leap years automatically." },
      { q: "How to calculate age in years?", a: "Subtract birth year from current year, then adjust based on birthday passed or not." },
    ],
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
  // Default for any calculator without specific SEO
  default: {
    intro: "This calculator provides accurate results for your needs. Enter your values and press calculate to get instant results.",
    formula: "Please refer to the specific formula for this calculation.",
    table: [],
    faqs: [],
  },
};
