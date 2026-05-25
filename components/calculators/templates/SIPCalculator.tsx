// "use client";

// import { useState } from "react";
// import BaseCalculator from "../BaseCalculator";

// export default function SIPCalculator() {
//   const [formValues, setFormValues] = useState({
//     monthlyInvestment: "",
//     annualReturn: "",
//     years: "",
//   });

//   const inputs = [
//     {
//       id: "monthlyInvestment",
//       label: "Monthly Investment (SIP Amount)",
//       type: "number" as const,
//       placeholder: "5000",
//       suffix: "₹",
//       required: true,
//       min: 100,
//       step: 100,
//     },
//     {
//       id: "annualReturn",
//       label: "Expected Annual Return Rate",
//       type: "number" as const,
//       placeholder: "12",
//       suffix: "%",
//       required: true,
//       min: 1,
//       max: 30,
//       step: 0.5,
//     },
//     {
//       id: "years",
//       label: "Investment Period",
//       type: "number" as const,
//       placeholder: "10",
//       suffix: "years",
//       required: true,
//       min: 1,
//       max: 50,
//     },
//   ];

//   const calculate = (values: Record<string, any>) => {
//     // Update form values state for use in custom result
//     setFormValues({
//       monthlyInvestment: values.monthlyInvestment || "",
//       annualReturn: values.annualReturn || "",
//       years: values.years || "",
//     });

//     const P = parseFloat(values.monthlyInvestment);
//     const r = parseFloat(values.annualReturn) / 100 / 12;
//     const n = parseFloat(values.years) * 12;

//     if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n)) {
//       return { mainResult: { label: "", value: "" }, extraRows: [] };
//     }

//     const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
//     const totalInvestment = P * n;
//     const estimatedReturns = futureValue - totalInvestment;

//     return {
//       mainResult: {
//         label: "Estimated Future Value",
//         value: `₹${Math.round(futureValue).toLocaleString("en-IN")}`,
//         color: "text-green-400",
//       },
//       extraRows: [
//         { label: "Total Investment", value: `₹${Math.round(totalInvestment).toLocaleString("en-IN")}` },
//         { label: "Estimated Returns", value: `₹${Math.round(estimatedReturns).toLocaleString("en-IN")}`, valueColor: "text-green-400" },
//         { label: "Wealth Gain Ratio", value: `${((estimatedReturns / totalInvestment) * 100).toFixed(1)}%` },
//       ],
//     };
//   };

//   return (
//     <BaseCalculator
//       title="SIP Calculator"
//       inputs={inputs}
//       calculate={calculate}
//       renderCustomResult={(result) => (
//         <div className="mt-4 p-3 bg-green-500/5 border border-green-500/15 rounded-lg">
//           <p className="text-xs text-gray-400 leading-relaxed">
//             📈 Your investment of ₹{Math.round(parseFloat(formValues.monthlyInvestment || "0")).toLocaleString()} per month 
//             could grow to {result?.mainResult?.value} in {formValues.years || "0"} years!
//           </p>
//         </div>
//       )}
//     />
//   );
// }