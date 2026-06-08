export interface CalculatorType {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
  tags: string[];
  category: "health" | "finance" | "tax" | "business";
  path: string;
}

export const CALCULATORS: CalculatorType[] = [
  {
    id: "bmi",
    slug: "bmi-calculator",
    name: "BMI Calculator",
    icon: "⚖️",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    desc: "Calculate your Body Mass Index and understand your healthy weight range.",
    tags: ["Health", "Free"],
    category: "health",
    path: "/health/bmi-calculator",
  },
  {
    id: "emi",
    slug: "emi-calculator",
    name: "EMI Calculator",
    icon: "🏦",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    desc: "Calculate monthly EMI for home, car, or personal loans instantly.",
    tags: ["Finance", "Free"],
    category: "finance",
    path: "/finance/emi-calculator",
  },
  {
    id: "gst",
    slug: "gst-calculator",
    name: "GST Calculator",
    icon: "🧾",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    desc: "Add or remove GST from any amount. Supports all Indian GST slabs.",
    tags: ["Tax", "India", "Free"],
    category: "tax",
    path: "/tax/gst-calculator",
  },
  // {
  //   id: "invoice",
  //   slug: "invoice-generator",
  //   name: "Invoice Generator",
  //   icon: "🧾",
  //   color: "#22c55e",
  //   bg: "rgba(34,197,94,0.1)",
  //   desc: "Add or remove GST from any amount. Supports all Indian GST slabs.",
  //   tags: ["Business", "India", "Free"],
  //   category: "business",
  //   path: "/business/invoice-generator",
  // },
];

export const seoContent = {
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
      { q: "Is BMI accurate for athletes and muscular individuals?", a: "BMI can overestimate fatness in people with high muscle mass, like athletes and bodybuilders. It does not distinguish between muscle and fat weight." },
      { q: "Is BMI the same for men and women?", a: "The BMI formula is the same, but body fat distribution differs. Women generally carry more body fat at the same BMI compared to men." },
      { q: "What should I do if my BMI is high?", a: "If your BMI indicates overweight or obesity, consult a healthcare professional. A combination of a balanced diet and regular physical activity can help reach a healthy weight." },
    ],
  },
  emi: {
    intro: "EMI (Equated Monthly Instalment) is the fixed monthly payment made to a bank or lender for a loan. It consists of the principal repayment and interest component, divided over the loan tenure.",
    formula: "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ – 1)",
    formulaUS: "",
    table: [
      ["P", "Principal Loan Amount"],
      ["r", "Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)"],
      ["n", "Number of Monthly Installments"],
      ["EMI", "Equated Monthly Installment"],
    ],
    faqs: [
      { q: "What factors affect my EMI?", a: "Three key factors affect your EMI: the loan principal amount, the annual interest rate, and the loan tenure. A higher principal or rate increases EMI; longer tenure decreases it." },
      { q: "Can I reduce my EMI after taking a loan?", a: "Yes. You can reduce EMI by making partial prepayments, refinancing at a lower interest rate, or renegotiating the loan tenure with your bank." },
      { q: "What is the difference between flat rate and reducing balance EMI?", a: "Flat rate calculates interest on the full principal throughout. Reducing balance calculates interest only on the outstanding principal, making it cheaper overall." },
      { q: "Is there a prepayment penalty?", a: "Most banks in India allow prepayment on floating rate loans without penalty. Fixed rate loans may charge 1–3% as foreclosure fee. Always verify with your lender." },
    ],
  },
  gst: {
    intro: "GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services across India. It replaced multiple central and state taxes like VAT, service tax, and excise duty.",
    formula: "GST Amount = Original Price × (GST Rate / 100)",
    formulaUS: "",
    table: [
      ["0%", "Essential items – rice, wheat, vegetables"],
      ["3%", "Gold, silver, precious metals"],
      ["5%", "Household necessities – sugar, edible oil"],
      ["12%", "Processed foods, smartphones, computers"],
      ["18%", "Most services, electronics, FMCG products"],
      ["28%", "Luxury goods, automobiles, tobacco"],
    ],
    faqs: [
      { q: "What is CGST and SGST?", a: "In intra-state transactions, GST is split equally into CGST (Central GST) collected by the central government and SGST (State GST) collected by the state. For inter-state, IGST applies." },
      { q: "How do I calculate GST exclusive price?", a: "If you have the pre-GST price, multiply it by (1 + GST rate/100). For example, ₹10,000 with 18% GST = ₹10,000 × 1.18 = ₹11,800." },
      { q: "How to calculate original price from GST inclusive amount?", a: "Divide the GST-inclusive amount by (1 + GST rate/100). For example, ₹11,800 ÷ 1.18 = ₹10,000 original price." },
      { q: "Who needs to register for GST?", a: "Any business with annual turnover exceeding ₹40 lakhs (goods) or ₹20 lakhs (services) must register for GST in India. Threshold is ₹10 lakhs for special category states." },
    ],
  },
};