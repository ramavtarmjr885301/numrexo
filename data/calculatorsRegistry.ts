// // data/calculatorsRegistry.ts

// export interface CalculatorType {
//   id: string;
//   slug: string;
//   name: string;
//   icon: string;
//   color: string;
//   bg: string;
//   desc: string;
//   description: string;
//   tags: string[];
//   category: 'health' | 'finance' | 'tax' | 'math' | 'conversion' | 'education' | 'construction' | 'fitness';
//   subcategory?: string;
//   shortName?: string;
//   shortDescription?: string;
//   isPremium?: boolean;
//   isNew?: boolean;
//   popularity?: number;
//   seoTitle?: string;
//   seoKeywords?: string[];
//   path: string;
// }

// export const CATEGORIES = {
//   health: { name: 'Health & Wellness', icon: '❤️', order: 1, basePath: '/health' },
//   fitness: { name: 'Fitness', icon: '💪', order: 2, basePath: '/fitness' },
//   finance: { name: 'Finance & Investment', icon: '💰', order: 3, basePath: '/finance' },
//   tax: { name: 'Tax', icon: '📋', order: 4, basePath: '/tax' },
//   math: { name: 'Mathematics', icon: '📐', order: 5, basePath: '/math' },
//   conversion: { name: 'Converters', icon: '🔄', order: 6, basePath: '/conversion' },
//   education: { name: 'Education', icon: '📚', order: 7, basePath: '/education' },
//   construction: { name: 'Construction', icon: '🏗️', order: 8, basePath: '/construction' },
// };

// // Helper function to generate path
// const generatePath = (category: string, slug: string) => `/${category}/${slug}`;

// export const CALCULATORS_REGISTRY: CalculatorType[] = [
//   // Existing calculators
//   {
//     id: "bmi",
//     slug: "bmi-calculator",
//     name: "BMI Calculator",
//     icon: "⚖️",
//     color: "#3b82f6",
//     bg: "rgba(59,130,246,0.1)",
//     desc: "Calculate your Body Mass Index and understand your healthy weight range",
//     description: "Calculate your Body Mass Index and understand your healthy weight range",
//     tags: ["Health", "Free", "Popular"],
//     category: "health",
//     path: generatePath("health", "bmi-calculator"),
//     popularity: 98,
//   },
//   {
//     id: "emi",
//     slug: "emi-calculator",
//     name: "EMI Calculator",
//     icon: "🏦",
//     color: "#a78bfa",
//     bg: "rgba(167,139,250,0.1)",
//     desc: "Calculate monthly EMI for home, car, or personal loans instantly",
//     description: "Calculate monthly EMI for home, car, or personal loans instantly",
//     tags: ["Finance", "Free", "Popular"],
//     category: "finance",
//     path: generatePath("finance", "emi-calculator"),
//     popularity: 95,
//   },
//   {
//     id: "gst",
//     slug: "gst-calculator",
//     name: "GST Calculator",
//     icon: "🧾",
//     color: "#22c55e",
//     bg: "rgba(34,197,94,0.1)",
//     desc: "Add or remove GST from any amount. Supports all Indian GST slabs",
//     description: "Add or remove GST from any amount. Supports all Indian GST slabs",
//     tags: ["Tax", "India", "Free", "Popular"],
//     category: "tax",
//     path: generatePath("tax", "gst-calculator"),
//     popularity: 90,
//   },

//   // New Fitness Calculators
//   {
//     id: "bmr",
//     slug: "bmr-calculator",
//     name: "BMR Calculator",
//     icon: "🔥",
//     color: "#ef4444",
//     bg: "rgba(239,68,68,0.1)",
//     desc: "Calculate your Basal Metabolic Rate to understand daily calorie needs",
//     description: "Calculate your Basal Metabolic Rate to understand daily calorie needs",
//     tags: ["Fitness", "Health", "New"],
//     category: "fitness",
//     path: generatePath("fitness", "bmr-calculator"),
//     popularity: 85,
//     isNew: true,
//   },
//   {
//     id: "body-fat",
//     slug: "body-fat-calculator",
//     name: "Body Fat Calculator",
//     icon: "📏",
//     color: "#10b981",
//     bg: "rgba(16,185,129,0.1)",
//     desc: "Estimate your body fat percentage using various methods",
//     description: "Estimate your body fat percentage using various methods",
//     tags: ["Fitness", "Health", "New"],
//     category: "fitness",
//     path: generatePath("fitness", "body-fat-calculator"),
//     popularity: 75,
//     isNew: true,
//   },
//   {
//     id: "calorie-burn",
//     slug: "calorie-burn-calculator",
//     name: "Calorie Burn Calculator",
//     icon: "🏃",
//     color: "#f59e0b",
//     bg: "rgba(245,158,11,0.1)",
//     desc: "Calculate calories burned during various activities",
//     description: "Calculate calories burned during various activities",
//     tags: ["Fitness", "Health", "New"],
//     category: "fitness",
//     path: generatePath("fitness", "calorie-burn-calculator"),
//     popularity: 80,
//     isNew: true,
//   },

//   // New Finance Calculators
//   {
//     id: "sip",
//     slug: "sip-calculator",
//     name: "SIP Calculator",
//     icon: "📈",
//     color: "#8b5cf6",
//     bg: "rgba(139,92,246,0.1)",
//     desc: "Calculate returns on your systematic investment plans",
//     description: "Calculate returns on your systematic investment plans",
//     tags: ["Finance", "Investment", "New"],
//     category: "finance",
//     path: generatePath("finance", "sip-calculator"),
//     popularity: 90,
//     isNew: true,
//   },
//   {
//     id: "fd",
//     slug: "fd-calculator",
//     name: "Fixed Deposit Calculator",
//     icon: "🏦",
//     color: "#3b82f6",
//     bg: "rgba(59,130,246,0.1)",
//     desc: "Calculate maturity amount and interest on fixed deposits",
//     description: "Calculate maturity amount and interest on fixed deposits",
//     tags: ["Finance", "Banking", "New"],
//     category: "finance",
//     path: generatePath("finance", "fd-calculator"),
//     popularity: 85,
//     isNew: true,
//   },
//   {
//     id: "ppf",
//     slug: "ppf-calculator",
//     name: "PPF Calculator",
//     icon: "💰",
//     color: "#06b6d4",
//     bg: "rgba(6,182,212,0.1)",
//     desc: "Calculate returns on Public Provident Fund investments",
//     description: "Calculate returns on Public Provident Fund investments",
//     tags: ["Finance", "Tax Saving", "New"],
//     category: "finance",
//     path: generatePath("finance", "ppf-calculator"),
//     popularity: 75,
//     isNew: true,
//   },

//   // New Math Calculators
//   {
//     id: "percentage",
//     slug: "percentage-calculator",
//     name: "Percentage Calculator",
//     icon: "%",
//     color: "#ec4899",
//     bg: "rgba(236,72,153,0.1)",
//     desc: "Calculate percentages, discounts, and percentage changes",
//     description: "Calculate percentages, discounts, and percentage changes",
//     tags: ["Math", "Everyday", "New"],
//     category: "math",
//     path: generatePath("math", "percentage-calculator"),
//     popularity: 95,
//     isNew: true,
//   },
//   {
//     id: "age",
//     slug: "age-calculator",
//     name: "Age Calculator",
//     icon: "🎂",
//     color: "#f43f5e",
//     bg: "rgba(244,63,94,0.1)",
//     desc: "Calculate exact age in years, months, and days",
//     description: "Calculate exact age in years, months, and days",
//     tags: ["Math", "Everyday", "Popular", "New"],
//     category: "math",
//     path: generatePath("math", "age-calculator"),
//     popularity: 92,
//     isNew: true,
//   },

//   // New Converters
//   {
//     id: "unit-converter",
//     slug: "unit-converter",
//     name: "Unit Converter",
//     icon: "📐",
//     color: "#14b8a6",
//     bg: "rgba(20,184,166,0.1)",
//     desc: "Convert between different units of length, weight, volume, and more",
//     description: "Convert between different units of length, weight, volume, and more",
//     tags: ["Converter", "Everyday", "New"],
//     category: "conversion",
//     path: generatePath("conversion", "unit-converter"),
//     popularity: 88,
//     isNew: true,
//   },
//   {
//     id: "currency-converter",
//     slug: "currency-converter",
//     name: "Currency Converter",
//     icon: "💱",
//     color: "#8b5cf6",
//     bg: "rgba(139,92,246,0.1)",
//     desc: "Convert between world currencies with live exchange rates",
//     description: "Convert between world currencies with live exchange rates",
//     tags: ["Converter", "Finance", "New"],
//     category: "conversion",
//     path: generatePath("conversion", "currency-converter"),
//     popularity: 82,
//     isNew: true,
//   },
// ];

// // Helper function to get calculators by category
// export const getCalculatorsByCategory = (category: string) => {
//   return CALCULATORS_REGISTRY.filter(calc => calc.category === category);
// };

// // Helper function to get popular calculators
// export const getPopularCalculators = (limit: number = 6) => {
//   return [...CALCULATORS_REGISTRY]
//     .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
//     .slice(0, limit);
// };

// // Helper function to get new calculators
// export const getNewCalculators = (limit: number = 4) => {
//   return CALCULATORS_REGISTRY.filter(calc => calc.isNew).slice(0, limit);
// };

// // Helper function to search calculators
// export const searchCalculators = (searchTerm: string) => {
//   const term = searchTerm.toLowerCase();
//   return CALCULATORS_REGISTRY.filter(calc => 
//     calc.name.toLowerCase().includes(term) ||
//     calc.desc.toLowerCase().includes(term) ||
//     calc.tags.some(tag => tag.toLowerCase().includes(term))
//   );
// };


// // SEO Content for all calculators
// export const seoContent: Record<string, any> = {
//   bmi: {
//     intro: "The Body Mass Index (BMI) is one of the most widely used tools for assessing whether an individual has a healthy body weight relative to their height. While it isn't a perfect measure, it provides a quick and easy screening tool.",
//     formula: "BMI (kg/m²) = Weight (kg) ÷ Height² (m)",
//     formulaUS: "BMI = 703 × Weight (lbs) ÷ Height² (inches)",
//     table: [
//       ["Severe Thinness", "< 16"],
//       ["Moderate Thinness", "16 – 17"],
//       ["Mild Thinness", "17 – 18.5"],
//       ["Normal", "18.5 – 25"],
//       ["Overweight", "25 – 30"],
//       ["Obese Class I", "30 – 35"],
//       ["Obese Class II", "35 – 40"],
//       ["Obese Class III", "> 40"],
//     ],
//     faqs: [
//       { q: "What is a healthy BMI range for adults?", a: "For adults (20 years and older), a BMI between 18.5 and 24.9 is considered normal and healthy." },
//       { q: "Is BMI accurate for athletes?", a: "BMI can overestimate fatness in people with high muscle mass." },
//       { q: "Is BMI the same for men and women?", a: "The BMI formula is the same, but body fat distribution differs." },
//       { q: "What should I do if my BMI is high?", a: "Consult a healthcare professional. A balanced diet and regular exercise can help." },
//     ],
//   },
//   emi: {
//     intro: "EMI (Equated Monthly Instalment) is the fixed monthly payment made to a bank or lender for a loan.",
//     formula: "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ – 1)",
//     table: [
//       ["P", "Principal Loan Amount"],
//       ["r", "Monthly Interest Rate"],
//       ["n", "Number of Monthly Installments"],
//     ],
//     faqs: [
//       { q: "What factors affect my EMI?", a: "Loan amount, interest rate, and tenure affect your EMI." },
//       { q: "Can I reduce my EMI?", a: "Yes, by making partial prepayments or refinancing." },
//     ],
//   },
//   gst: {
//     intro: "GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services across India.",
//     formula: "GST Amount = Original Price × (GST Rate / 100)",
//     table: [
//       ["0%", "Essential items"],
//       ["5%", "Household necessities"],
//       ["12%", "Processed foods"],
//       ["18%", "Most services"],
//       ["28%", "Luxury goods"],
//     ],
//     faqs: [
//       { q: "What is CGST and SGST?", a: "In intra-state transactions, GST is split equally into CGST and SGST." },
//       { q: "How to calculate GST?", a: "Multiply the original price by GST rate divided by 100." },
//     ],
//   },
//   // Add SEO for new calculators (you can expand these later)
//   bmr: {
//     intro: "Basal Metabolic Rate (BMR) is the number of calories your body burns while at rest.",
//     formula: "For Men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)",
//     formulaUS: "For Women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)",
//     table: [],
//     faqs: [],
//   },
//   sip: {
//     intro: "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds.",
//     formula: "FV = P × ((1 + r)ⁿ - 1) / r × (1 + r)",
//     table: [],
//     faqs: [],
//   },
//   percentage: {
//     intro: "Percentage calculator helps you find what percent one number is of another, or calculate percentage increase/decrease.",
//     formula: "Percentage = (Value / Total) × 100",
//     table: [],
//     faqs: [],
//   },
//   age: {
//     intro: "Age calculator tells you exactly how old you are in years, months, and days.",
//     formula: "Age = Current Date - Birth Date",
//     table: [],
//     faqs: [],
//   },
// };


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

  // Default for any calculator without specific SEO
  default: {
    intro: "This calculator provides accurate results for your needs. Enter your values and press calculate to get instant results.",
    formula: "Please refer to the specific formula for this calculation.",
    table: [],
    faqs: [],
  },
};