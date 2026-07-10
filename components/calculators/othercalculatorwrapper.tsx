// "use client";

// import {
//     CalculatorType,
//     CALCULATORS_REGISTRY,
// } from "@/data/calculatorsRegistry";
// import Breadcrumb from "@/components/common/Breadcrumb";
// import PageHeader from "@/components/common/PageHeader";
// import { useRouter } from "next/navigation";
// import BMICalculator from "./BMICalculator";
// import EMICalculator from "./EMICalculator";
// import GSTCalculator from "./GSTCalculator";
// import SIPCalculator from "./SIPCalculator";
// import FDCalculator from "./FDCalculator";
// import BMRCalculator from "./BMRCalculator";
// import BodyFatCalculator from "./BodyFatCalculator";
// import CalorieBurnCalculator from "./CalorieBurnCalculator";
// import AgeCalculator from "./AgeCalculator";
// import PercentageCalculator from "./PercentageCalculator";
// import UnitConverter from "./UnitConverter";
// import PPFCalculator from "./PPFCalculator";
// import DiscountCalculator from "./DiscountCalculator";
// import GPACalculator from "./GPACalculator";
// import FuelCostCalculator from "./FuelCostCalculator";
// import DateDifferenceCalculator from "./DateDifferenceCalculator";
// import ProfitMarginCalculator from "./ProfitMarginCalculator";
// import LumpsumCalculator from "./LumpsumCalculator";
// import CAGRCalculator from "./CAGRCalculator";
// import WaterIntakeCalculator from "./WaterIntakeCalculator";
// import SleepCalculator from "./SleepCalculator";
// import RDCalculator from "./RDCalculator";
// import IdealWeightCalculator from "./IdealWeightCalculator";
// import OvulationCalculator from "./OvulationCalculator";
// import NPSCalculator from "./NPSCalculator";
// import SWPCalculator from "./SWPCalculator";
// import LoanEligibilityCalculator from "./LoanEligibilityCalculator";
// import GratuityCalculator from "./GratuityCalculator";
// import EPFCalculator from "./EPFCalculator";
// import FractionCalculator from "./FractionCalculator";
// import QuadraticSolver from "./QuadraticSolver";
// import ConcreteCalculator from "./ConcreteCalculator";
// import SalesTaxCalculator from "./SalesTaxCalculator";
// import LTCGCalculator from "./LTCGCalculator";
// import VATCalculator from "./VATCalculator";
// import ROICalculator from "./ROICalculator";
// import BreakEvenCalculator from "./BreakEvenCalculator";
// import MarkupCalculator from "./MarkupCalculator";
// import CGPACalculator from "./CGPACalculator";
// import GradeCalculator from "./GradeCalculator";
// import WeightedGradeCalculator from "./WeightedGradeCalculator";
// import FinalGradeCalculator from "./FinalGradeCalculator";
// import APYCalculator from "./APYCalculator";
// import LoanComparisonCalculator from "./LoanComparisonCalculator";
// import TipCalculator from "./TipCalculator";
// import SalesCommissionCalculator from "./SalesCommissionCalculator";
// import BodyTypeCalculator from "./BodyTypeCalculator";
// import PregnancyDueDateCalculator from "./PregnancyDueDateCalculator";
// import NutritionLabelGenerator from "./NutritionLabelGenerator";
// import CalorieCounter from "./CalorieCounter";
// import DecimalToFractionCalculator from "./DecimalToFractionCalculator";
// import RatioCalculator from "./RatioCalculator";
// import PythagoreanCalculator from "./PythagoreanCalculator";
// import AreaCalculator from "./AreaCalculator";
// import VolumeCalculator from "./VolumeCalculator";
// import SlopeCalculator from "./SlopeCalculator";
// import StatisticsCalculator from "./StatisticsCalculator";
// import DistanceCalculator from "./DistanceCalculator";
// import LengthConverter from "./LengthConverter";
// import WeightConverter from "./WeightConverter";
// import TemperatureConverter from "./TemperatureConverter";
// import AreaConverter from "./AreaConverter";
// import VolumeConverter from "./VolumeConverter";
// import SpeedConverter from "./SpeedConverter";
// import TimeConverter from "./TimeConverter";
// import DataConverter from "./DataConverter";
// import PressureConverter from "./PressureConverter";
// import EnergyConverter from "./EnergyConverter";
// import PowerConverter from "./PowerConverter";
// import AngleConverter from "./AngleConverter";
// import AddDaysCalculator from "./AddDaysCalculator";
// import WorkingDaysCalculator from "./WorkingDaysCalculator";
// import TimeDurationCalculator from "./TimeDurationCalculator";
// import BirthdayCountdown from "./BirthdayCountdown";
// import Stopwatch from "./Stopwatch";
// import Timer from "./Timer";
// import CarpetAreaCalculator from "./CarpetAreaCalculator";
// import BuiltUpAreaCalculator from "./BuiltUpAreaCalculator";
// import PaintCalculator from "./PaintCalculator";
// import FlooringCalculator from "./FlooringCalculator";
// import WallpaperCalculator from "./WallpaperCalculator";
// import RoofingCalculator from "./RoofingCalculator";
// import LandAreaCalculator from "./LandAreaCalculator";
// import RecipeConverter from "./RecipeConverter";
// import CookingTimeCalculator from "./CookingTimeCalculator";
// import OvenTemperatureConverter from "./OvenTemperatureConverter";
// import BakingConverter from "./BakingConverter";
// import FoodExpiryCalculator from "./FoodExpiryCalculator";
// import WaterBillCalculator from "./WaterBillCalculator";
// import TravelBudgetCalculator from "./TravelBudgetCalculator";
// import FlightTimeCalculator from "./FlightTimeCalculator";
// import HotelCostCalculator from "./HotelCostCalculator";
// import LuggageAllowanceCalculator from "./LuggageAllowanceCalculator";
// import CAPMCalculator from "./CAPMCalculator";
// import XIRRCalculator from "./XIRRCalculator";
// import PropertyTaxCalculator from "./PropertyTaxCalculator";
// import RentalYieldCalculator from "./RentalYieldCalculator";
// import CollegeCostCalculator from "./CollegeCostCalculator";
// import StudentLoanCalculator from "./StudentLoanCalculator";
// import ScholarshipCalculator from "./ScholarshipCalculator";
// import AttendanceCalculator from "./AttendanceCalculator";
// import PercentageMarksCalculator from "./PercentageMarksCalculator";
// import PaceCalculator from "./PaceCalculator";
// import DistanceSpeedTimeCalculator from "./DistanceSpeedTimeCalculator";
// import InvoiceGenerator from "./InvoiceGenerator";
// import MortgageCalculator from "./MortgageCalculator";
// import PopulationCalculator from "./PopulationCalculator";
// import PersonalLoanEMICalculator from "./PersonalLoanEMICalculator";
// import ConsumerLoanEMICalculator from "./ConsumerLoanEMICalculator";
// import HomeLoanEMICalculator from "./HomeLoaneEMICalculator";
// import CarLoanEMICalculator from "./CarLoanEMICalculator";
// import BikeLoanEMICalculator from "./BikeLoanEMICalculator";
// import HomeLoanEligibilityCalculator from "./HomeLoanEligibilityCalculator";
// import AmortizationCalculator from "./AmortizationCalculator";
// import CreditScoreEstimator from "./CreditScoreEstimatorCalculator";
// import LoanPrepaymentCalculator from "./LoanPrepaymentCalculator";
// import SalaryBudgetingCalculator from "./SalaryBudgetingCalculator";
// interface CalculatorWrapperProps {
//     calculator: CalculatorType;
// }



// export default function CalculatorWrapper({
//     calculator,
// }: CalculatorWrapperProps) {
//     const router = useRouter();


//     // Use CALCULATORS_REGISTRY instead of CALCULATORS
//     const relatedCalcs = CALCULATORS_REGISTRY.filter(
//         (c: CalculatorType) => c.id !== calculator.id,
//     );

//     const renderCalculator = () => {
//         switch (calculator.id) {
//             case "bmi":
//                 return <BMICalculator />;
//             case "emi":
//                 return <EMICalculator />;
//             case "gst":
//                 return <GSTCalculator />;
//             case "sip":
//                 return <SIPCalculator />;
//             case "fd":
//                 return <FDCalculator />;
//             case "bmr":
//                 return <BMRCalculator />;
//             case "body-fat":
//                 return <BodyFatCalculator />;
//             case "calorie-burn":
//                 return <CalorieBurnCalculator />;
//             case "age":
//                 return <AgeCalculator />;
//             case "percentage":
//                 return <PercentageCalculator />;
//             // case "currency-converter":
//             //   return <CurrencyConverter />;
//             case "unit-converter":
//                 return <UnitConverter />;
//             case "ppf":
//                 return <PPFCalculator />
//             case "discount":
//                 return <DiscountCalculator />;
//             case "gpa":
//                 return <GPACalculator />;
//             case "fuel-cost":
//                 return <FuelCostCalculator />;
//             case "date-difference":
//                 return <DateDifferenceCalculator />;
//             case "profit-margin":
//                 return <ProfitMarginCalculator />;
//             case "lumpsum":
//                 return <LumpsumCalculator />;
//             case "cagr":
//                 return <CAGRCalculator />;
//             case "water-intake":
//                 return <WaterIntakeCalculator />;
//             case "sleep":
//                 return <SleepCalculator />;
//             case "rd":
//                 return <RDCalculator />;
//             case "ideal-weight":
//                 return <IdealWeightCalculator />;
//             case "ovulation":
//                 return <OvulationCalculator />;
//             case "nps":
//                 return <NPSCalculator />;
//             case "swp":
//                 return <SWPCalculator />;
//             case "loan-eligibility":
//                 return <LoanEligibilityCalculator />;
//             case "gratuity":
//                 return <GratuityCalculator />;
//             case "epf":
//                 return <EPFCalculator />;
//             case "fraction":
//                 return <FractionCalculator />;
//             case "concrete":
//                 return <ConcreteCalculator />;
//             case "quadratic":
//                 return <QuadraticSolver />;
//             case "sales-tax":
//                 return <SalesTaxCalculator />;
//             case "ltcg":
//                 return <LTCGCalculator />;
//             case "vat":
//                 return <VATCalculator />;
//             case "roi":
//                 return <ROICalculator />;
//             case "break-even":
//                 return <BreakEvenCalculator />;
//             case "markup":
//                 return <MarkupCalculator />;
//             case "cgpa":
//                 return <CGPACalculator />;
//             case "grade":
//                 return <GradeCalculator />;
//             case "weighted-grade":
//                 return <WeightedGradeCalculator />;
//             case "final-grade":
//                 return <FinalGradeCalculator />;
//             case "apy":
//                 return <APYCalculator />;
//             case "loan-comparison":
//                 return <LoanComparisonCalculator />;
//             case "tip":
//                 return <TipCalculator />;
//             case "sales-commission":
//                 return <SalesCommissionCalculator />;
//             case "body-type":
//                 return <BodyTypeCalculator />;
//             case "pregnancy-due":
//                 return <PregnancyDueDateCalculator />;
//             case "nutrition-label":
//                 return <NutritionLabelGenerator />;
//             case "calorie-counter":
//                 return <CalorieCounter />;
//             case "decimal":
//                 return <DecimalToFractionCalculator />;
//             case "ratio":
//                 return <RatioCalculator />;
//             case "pythagorean":
//                 return <PythagoreanCalculator />;
//             case "area":
//                 return <AreaCalculator />;
//             case "volume":
//                 return <VolumeCalculator />;
//             case "slope":
//                 return <SlopeCalculator />;
//             case "mean-median-mode":
//                 return <StatisticsCalculator />;
//             case "distance":
//                 return <DistanceCalculator />;
//             case "length-converter":
//                 return <LengthConverter />;
//             case "weight-converter":
//                 return <WeightConverter />;
//             case "temperature-converter":
//                 return <TemperatureConverter />;
//             case "area-converter":
//                 return <AreaConverter />;
//             case "volume-converter":
//                 return <VolumeConverter />;
//             case "speed-converter":
//                 return <SpeedConverter />;
//             case "time-converter":
//                 return <TimeConverter />;
//             case "data-converter":
//                 return <DataConverter />;
//             case "pressure-converter":
//                 return <PressureConverter />;
//             case "energy-converter":
//                 return <EnergyConverter />;
//             case "power-converter":
//                 return <PowerConverter />;
//             case "angle-converter":
//                 return <AngleConverter />;
//             case "add-days":
//                 return <AddDaysCalculator />;
//             case "work-days":
//                 return <WorkingDaysCalculator />;
//             case "time-duration":
//                 return <TimeDurationCalculator />;
//             case "birthday-countdown":
//                 return <BirthdayCountdown />;
//             case "stopwatch":
//                 return <Stopwatch />;
//             case "timer":
//                 return <Timer />;
//             case "carpet-area":
//                 return <CarpetAreaCalculator />;
//             case "built-up-area":
//                 return <BuiltUpAreaCalculator />;
//             case "paint":
//                 return <PaintCalculator />;
//             case "flooring":
//                 return <FlooringCalculator />;
//             case "wallpaper":
//                 return <WallpaperCalculator />;
//             case "roofing":
//                 return <RoofingCalculator />;
//             case "land-area":
//                 return <LandAreaCalculator />;
//             case "recipe-converter":
//                 return <RecipeConverter />;
//             case "cooking-time":
//                 return <CookingTimeCalculator />;
//             case "oven-temperature":
//                 return <OvenTemperatureConverter />;
//             case "baking-converter":
//                 return <BakingConverter />;
//             case "food-expiry":
//                 return <FoodExpiryCalculator />;
//             case "water-bill":
//                 return <WaterBillCalculator />;
//             case "travel-budget":
//                 return <TravelBudgetCalculator />;
//             case "flight-time":
//                 return <FlightTimeCalculator />;
//             case "hotel-cost":
//                 return <HotelCostCalculator />;
//             case "luggage-allowance":
//                 return <LuggageAllowanceCalculator />;
//             case "capm":
//                 return <CAPMCalculator />
//             case "xirr":
//                 return <XIRRCalculator />
//             case "property-tax":
//                 return <PropertyTaxCalculator />
//             case "rental-yield":
//                 return <RentalYieldCalculator />
//             case "college-cost":
//                 return <CollegeCostCalculator />
//             case "student-loan":
//                 return <StudentLoanCalculator />
//             case "scholarship":
//                 return <ScholarshipCalculator />
//             case "attendance":
//                 return <AttendanceCalculator />
//             case "pace":
//                 return <PaceCalculator />
//             case "distance-speed-time":
//                 return <DistanceSpeedTimeCalculator />
//             case "invoice":
//                 return <InvoiceGenerator />
//             case "percentage-marks":
//                 return <PercentageMarksCalculator />
//             case "mortgage":
//                 return <MortgageCalculator />
//             case "population":
//                 return <PopulationCalculator />
//             case "personal-loan-emi":
//                 return <PersonalLoanEMICalculator />
//             case "consumer-loan-emi":
//                 return <ConsumerLoanEMICalculator />
//             case "home-loan-emi":
//                 return <HomeLoanEMICalculator />
//             case "car-loan-emi":
//                 return <CarLoanEMICalculator />
//             case "bike-loan-emi":
//                 return <BikeLoanEMICalculator />
//             case "home-loan-eligibility":
//                 return <HomeLoanEligibilityCalculator />
//             case "amortization":
//                 return <AmortizationCalculator />
//             case "credit-score-estimator":
//                 return <CreditScoreEstimator />
//             case "loan-prepayment":
//                 return <LoanPrepaymentCalculator />
//             case "salary-budgeting":
//                 return <SalaryBudgetingCalculator />
//             // Add more cases for other calculators
//             default:
//                 return (
//                     <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-8 text-center">
//                         <p className="text-yellow-400">⚠️ Calculator coming soon!</p>
//                         <p className="text-gray-400 text-sm mt-2">
//                             This calculator is under development.
//                         </p>
//                     </div>
//                 );
//         }
//     };

//     const breadcrumbItems = [
//         { label: "Calculators", href: "/calculators" },
//         { label: calculator.name, href: calculator.path },
//     ];

//     return (
//         <div className="px-6 py-8 md:py-12">
//             <div className="max-w-6xl mx-auto">
//                 <Breadcrumb items={breadcrumbItems} />

//                 <PageHeader
//                     icon={calculator.icon}
//                     title={calculator.name}
//                     tags={calculator.tags}
//                     description={calculator.desc}
//                     iconBg={calculator.bg}
//                 />

//                 {renderCalculator()}

//                 {/* Related Calculators */}
//                 <div>
//                     <div className="text-center mb-6">
//                         <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
//                             Related Tools
//                         </span>
//                         <h2 className="text-2xl font-bold mt-1">Other Calculators</h2>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {relatedCalcs.slice(0, 6).map((calc: CalculatorType) => (
//                             <button
//                                 key={calc.id}
//                                 onClick={() => router.push(calc.path)}
//                                 className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-left transition-all hover:border-blue-500/50 hover:-translate-y-1"
//                             >
//                                 <div className="text-2xl mb-2">{calc.icon}</div>
//                                 <h4 className="font-semibold mb-1">{calc.name}</h4>
//                                 <p className="text-xs text-gray-500">
//                                     {calc.desc.slice(0, 60)}…
//                                 </p>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
