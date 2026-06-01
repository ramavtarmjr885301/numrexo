"use client";

import {
  CalculatorType,
  seoContent,
  CALCULATORS_REGISTRY,
} from "@/data/calculatorsRegistry";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageHeader from "@/components/common/PageHeader";
// import FAQSection from "@/components/common/FAQSection";
import BMICalculator from "./BMICalculator";
import EMICalculator from "./EMICalculator";
import GSTCalculator from "./GSTCalculator";
import SIPCalculator from "./SIPCalculator";
import FDCalculator from "./FDCalculator";
import BMRCalculator from "./BMRCalculator";
import BodyFatCalculator from "./BodyFatCalculator";
import CalorieBurnCalculator from "./CalorieBurnCalculator";
import AgeCalculator from "./AgeCalculator";
import PercentageCalculator from "./PercentageCalculator";
import CurrencyConverter from "./CurrencyConverter";
import UnitConverter from "./UnitConverter";
import PPFCalculator from "./PPFCalculator";
import { useRouter } from "next/navigation";
import DiscountCalculator from "./DiscountCalculator";
import GPACalculator from "./GPACalculator";
import FuelCostCalculator from "./FuelCostCalculator";
import DateDifferenceCalculator from "./DateDifferenceCalculator";
import ProfitMarginCalculator from "./ProfitMarginCalculator";
import LumpsumCalculator from "./LumpsumCalculator";
import CAGRCalculator from "./CAGRCalculator";
import WaterIntakeCalculator from "./WaterIntakeCalculator";
import SleepCalculator from "./SleepCalculator";
import RDCalculator from "./RDCalculator";

interface CalculatorWrapperProps {
  calculator: CalculatorType;
}

// Define the type for table rows
type TableRow = [string, string];

// Define the type for FAQ items
interface FAQItem {
  q: string;
  a: string;
}

// Define the SEO content type
interface SEOContent {
  intro: string;
  formula: string;
  formulaUS?: string;
  table: TableRow[];
  faqs: FAQItem[];
}

export default function CalculatorWrapper({
  calculator,
}: CalculatorWrapperProps) {
  const router = useRouter();
  const seo = seoContent[calculator.id as keyof typeof seoContent] as
    | SEOContent
    | undefined;

  // Use CALCULATORS_REGISTRY instead of CALCULATORS
  const relatedCalcs = CALCULATORS_REGISTRY.filter(
    (c: CalculatorType) => c.id !== calculator.id,
  );

  const renderCalculator = () => {
    switch (calculator.id) {
      case "bmi":
        return <BMICalculator />;
      case "emi":
        return <EMICalculator />;
      case "gst":
        return <GSTCalculator />;
      case "sip":
        return <SIPCalculator />;
      case "fd":
        return <FDCalculator />;
      case "bmr":
        return <BMRCalculator />;
      case "body-fat":
        return <BodyFatCalculator />;
      case "calorie-burn":
        return <CalorieBurnCalculator />;
      case "age":
        return <AgeCalculator />;
      case "percentage":
        return <PercentageCalculator />;
      case "currency-converter":
        return <CurrencyConverter />;
      case "unit-converter":
        return <UnitConverter />;
      case "ppf":
        return <PPFCalculator />
      case "discount":
        return <DiscountCalculator />;
      case "gpa":
        return <GPACalculator />;
      case "fuel-cost":
        return <FuelCostCalculator />;
      case "date-difference":
        return <DateDifferenceCalculator />;
      case "profit-margin":
        return <ProfitMarginCalculator />;
      case "lumpsum":
        return <LumpsumCalculator />;
      case "cagr":
        return <CAGRCalculator />;
      case "water-intake":
        return <WaterIntakeCalculator />;
      case "sleep":
        return <SleepCalculator />;
      case "rd":
        return <RDCalculator />;
      // Add more cases for other calculators
      default:
        return (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-8 text-center">
            <p className="text-yellow-400">⚠️ Calculator coming soon!</p>
            <p className="text-gray-400 text-sm mt-2">
              This calculator is under development.
            </p>
          </div>
        );
    }
  };

  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: calculator.name, href: calculator.path },
  ];

  return (
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <PageHeader
          icon={calculator.icon}
          title={calculator.name}
          tags={calculator.tags}
          description={seo?.intro || calculator.desc}
          iconBg={calculator.bg}
        />

        {renderCalculator()}

        {/* SEO Content - Only show if seo exists */}
        {seo && (
          <>
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold mb-4">
                About the {calculator.name}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">{seo.intro}</p>

              <h3 className="text-lg font-semibold mb-3">Formula</h3>
              <div className="bg-[#0f1525] border border-gray-800 rounded-lg p-4 font-mono text-sm text-blue-400 mb-6">
                {seo.formula}
              </div>

              {seo.formulaUS && (
                <div className="bg-[#0f1525] border border-gray-800 rounded-lg p-4 font-mono text-sm text-blue-400 mb-6">
                  {seo.formulaUS}
                </div>
              )}

              <h3 className="text-lg font-semibold mb-4">
                {calculator.id === "bmi"
                  ? "BMI Classification Table"
                  : calculator.id === "emi"
                    ? "Formula Variables"
                    : "GST Rate Slabs in India"}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-500 font-semibold">
                        {calculator.id === "bmi"
                          ? "Classification"
                          : calculator.id === "emi"
                            ? "Variable"
                            : "GST Rate"}
                      </th>
                      <th className="text-left py-3 px-4 text-gray-500 font-semibold">
                        {calculator.id === "bmi"
                          ? "BMI Range (kg/m²)"
                          : calculator.id === "emi"
                            ? "Description"
                            : "Category / Items"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {seo.table &&
                      seo.table.map((row: TableRow, index: number) => (
                        <tr
                          key={index}
                          className="border-b border-gray-800/50 hover:bg-gray-800/30"
                        >
                          <td className="py-2 px-4 text-gray-300">{row[0]}</td>
                          <td className="py-2 px-4 text-gray-400">{row[1]}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ */}
            {/* {seo.faqs && (
              <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <FAQSection items={seo.faqs} />
              </div>
            )} */}
          </>
        )}

        {/* Related Calculators */}
        <div>
          <div className="text-center mb-6">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Related Tools
            </span>
            <h2 className="text-2xl font-bold mt-1">Other Calculators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCalcs.slice(0, 6).map((calc: CalculatorType) => (
              <button
                key={calc.id}
                onClick={() => router.push(calc.path)}
                className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-left transition-all hover:border-blue-500/50 hover:-translate-y-1"
              >
                <div className="text-2xl mb-2">{calc.icon}</div>
                <h4 className="font-semibold mb-1">{calc.name}</h4>
                <p className="text-xs text-gray-500">
                  {calc.desc.slice(0, 60)}…
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
