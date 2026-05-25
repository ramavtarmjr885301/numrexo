// data/calculatorsRegistry.ts

export interface CalculatorType {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
  description: string;
  tags: string[];
  category: 'health' | 'finance' | 'tax' | 'math' | 'conversion' | 'education' | 'construction' | 'fitness';
  subcategory?: string;
  shortName?: string;
  shortDescription?: string;
  isPremium?: boolean;
  isNew?: boolean;
  popularity?: number;
  seoTitle?: string;
  seoKeywords?: string[];
  path: string;
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
};

// Helper function to generate path
const generatePath = (category: string, slug: string) => `/${category}/${slug}`;

export const CALCULATORS_REGISTRY: CalculatorType[] = [
  // Existing calculators
  {
    id: "bmi",
    slug: "bmi-calculator",
    name: "BMI Calculator",
    icon: "⚖️",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    desc: "Calculate your Body Mass Index and understand your healthy weight range",
    description: "Calculate your Body Mass Index and understand your healthy weight range",
    tags: ["Health", "Free", "Popular"],
    category: "health",
    path: generatePath("health", "bmi-calculator"),
    popularity: 98,
  },
  {
    id: "emi",
    slug: "emi-calculator",
    name: "EMI Calculator",
    icon: "🏦",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    desc: "Calculate monthly EMI for home, car, or personal loans instantly",
    description: "Calculate monthly EMI for home, car, or personal loans instantly",
    tags: ["Finance", "Free", "Popular"],
    category: "finance",
    path: generatePath("finance", "emi-calculator"),
    popularity: 95,
  },
  {
    id: "gst",
    slug: "gst-calculator",
    name: "GST Calculator",
    icon: "🧾",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    desc: "Add or remove GST from any amount. Supports all Indian GST slabs",
    description: "Add or remove GST from any amount. Supports all Indian GST slabs",
    tags: ["Tax", "India", "Free", "Popular"],
    category: "tax",
    path: generatePath("tax", "gst-calculator"),
    popularity: 90,
  },

  // New Fitness Calculators
  {
    id: "bmr",
    slug: "bmr-calculator",
    name: "BMR Calculator",
    icon: "🔥",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    desc: "Calculate your Basal Metabolic Rate to understand daily calorie needs",
    description: "Calculate your Basal Metabolic Rate to understand daily calorie needs",
    tags: ["Fitness", "Health", "New"],
    category: "fitness",
    path: generatePath("fitness", "bmr-calculator"),
    popularity: 85,
    isNew: true,
  },
  {
    id: "body-fat",
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    icon: "📏",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    desc: "Estimate your body fat percentage using various methods",
    description: "Estimate your body fat percentage using various methods",
    tags: ["Fitness", "Health", "New"],
    category: "fitness",
    path: generatePath("fitness", "body-fat-calculator"),
    popularity: 75,
    isNew: true,
  },
  {
    id: "calorie-burn",
    slug: "calorie-burn-calculator",
    name: "Calorie Burn Calculator",
    icon: "🏃",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    desc: "Calculate calories burned during various activities",
    description: "Calculate calories burned during various activities",
    tags: ["Fitness", "Health", "New"],
    category: "fitness",
    path: generatePath("fitness", "calorie-burn-calculator"),
    popularity: 80,
    isNew: true,
  },

  // New Finance Calculators
  {
    id: "sip",
    slug: "sip-calculator",
    name: "SIP Calculator",
    icon: "📈",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    desc: "Calculate returns on your systematic investment plans",
    description: "Calculate returns on your systematic investment plans",
    tags: ["Finance", "Investment", "New"],
    category: "finance",
    path: generatePath("finance", "sip-calculator"),
    popularity: 90,
    isNew: true,
  },
  {
    id: "fd",
    slug: "fd-calculator",
    name: "Fixed Deposit Calculator",
    icon: "🏦",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    desc: "Calculate maturity amount and interest on fixed deposits",
    description: "Calculate maturity amount and interest on fixed deposits",
    tags: ["Finance", "Banking", "New"],
    category: "finance",
    path: generatePath("finance", "fd-calculator"),
    popularity: 85,
    isNew: true,
  },
  {
    id: "ppf",
    slug: "ppf-calculator",
    name: "PPF Calculator",
    icon: "💰",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.1)",
    desc: "Calculate returns on Public Provident Fund investments",
    description: "Calculate returns on Public Provident Fund investments",
    tags: ["Finance", "Tax Saving", "New"],
    category: "finance",
    path: generatePath("finance", "ppf-calculator"),
    popularity: 75,
    isNew: true,
  },

  // New Math Calculators
  {
    id: "percentage",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    icon: "%",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.1)",
    desc: "Calculate percentages, discounts, and percentage changes",
    description: "Calculate percentages, discounts, and percentage changes",
    tags: ["Math", "Everyday", "New"],
    category: "math",
    path: generatePath("math", "percentage-calculator"),
    popularity: 95,
    isNew: true,
  },
  {
    id: "age",
    slug: "age-calculator",
    name: "Age Calculator",
    icon: "🎂",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.1)",
    desc: "Calculate exact age in years, months, and days",
    description: "Calculate exact age in years, months, and days",
    tags: ["Math", "Everyday", "Popular", "New"],
    category: "math",
    path: generatePath("math", "age-calculator"),
    popularity: 92,
    isNew: true,
  },

  // New Converters
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Unit Converter",
    icon: "📐",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.1)",
    desc: "Convert between different units of length, weight, volume, and more",
    description: "Convert between different units of length, weight, volume, and more",
    tags: ["Converter", "Everyday", "New"],
    category: "conversion",
    path: generatePath("conversion", "unit-converter"),
    popularity: 88,
    isNew: true,
  },
  {
    id: "currency-converter",
    slug: "currency-converter",
    name: "Currency Converter",
    icon: "💱",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    desc: "Convert between world currencies with live exchange rates",
    description: "Convert between world currencies with live exchange rates",
    tags: ["Converter", "Finance", "New"],
    category: "conversion",
    path: generatePath("conversion", "currency-converter"),
    popularity: 82,
    isNew: true,
  },
];

// Helper function to get calculators by category
export const getCalculatorsByCategory = (category: string) => {
  return CALCULATORS_REGISTRY.filter(calc => calc.category === category);
};

// Helper function to get popular calculators
export const getPopularCalculators = (limit: number = 6) => {
  return [...CALCULATORS_REGISTRY]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
};

// Helper function to get new calculators
export const getNewCalculators = (limit: number = 4) => {
  return CALCULATORS_REGISTRY.filter(calc => calc.isNew).slice(0, limit);
};

// Helper function to search calculators
export const searchCalculators = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return CALCULATORS_REGISTRY.filter(calc => 
    calc.name.toLowerCase().includes(term) ||
    calc.desc.toLowerCase().includes(term) ||
    calc.tags.some(tag => tag.toLowerCase().includes(term))
  );
};


// SEO Content for all calculators
export const seoContent: Record<string, any> = {
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
      { q: "What is a healthy BMI range for adults?", a: "For adults (20 years and older), a BMI between 18.5 and 24.9 is considered normal and healthy." },
      { q: "Is BMI accurate for athletes?", a: "BMI can overestimate fatness in people with high muscle mass." },
      { q: "Is BMI the same for men and women?", a: "The BMI formula is the same, but body fat distribution differs." },
      { q: "What should I do if my BMI is high?", a: "Consult a healthcare professional. A balanced diet and regular exercise can help." },
    ],
  },
  emi: {
    intro: "EMI (Equated Monthly Instalment) is the fixed monthly payment made to a bank or lender for a loan.",
    formula: "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ – 1)",
    table: [
      ["P", "Principal Loan Amount"],
      ["r", "Monthly Interest Rate"],
      ["n", "Number of Monthly Installments"],
    ],
    faqs: [
      { q: "What factors affect my EMI?", a: "Loan amount, interest rate, and tenure affect your EMI." },
      { q: "Can I reduce my EMI?", a: "Yes, by making partial prepayments or refinancing." },
    ],
  },
  gst: {
    intro: "GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services across India.",
    formula: "GST Amount = Original Price × (GST Rate / 100)",
    table: [
      ["0%", "Essential items"],
      ["5%", "Household necessities"],
      ["12%", "Processed foods"],
      ["18%", "Most services"],
      ["28%", "Luxury goods"],
    ],
    faqs: [
      { q: "What is CGST and SGST?", a: "In intra-state transactions, GST is split equally into CGST and SGST." },
      { q: "How to calculate GST?", a: "Multiply the original price by GST rate divided by 100." },
    ],
  },
  // Add SEO for new calculators (you can expand these later)
  bmr: {
    intro: "Basal Metabolic Rate (BMR) is the number of calories your body burns while at rest.",
    formula: "For Men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)",
    formulaUS: "For Women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)",
    table: [],
    faqs: [],
  },
  sip: {
    intro: "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds.",
    formula: "FV = P × ((1 + r)ⁿ - 1) / r × (1 + r)",
    table: [],
    faqs: [],
  },
  percentage: {
    intro: "Percentage calculator helps you find what percent one number is of another, or calculate percentage increase/decrease.",
    formula: "Percentage = (Value / Total) × 100",
    table: [],
    faqs: [],
  },
  age: {
    intro: "Age calculator tells you exactly how old you are in years, months, and days.",
    formula: "Age = Current Date - Birth Date",
    table: [],
    faqs: [],
  },
};