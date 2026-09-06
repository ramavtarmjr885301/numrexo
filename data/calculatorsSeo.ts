// data/calculatorsSeo.ts
//
// Per-calculator SEO copy, keyed by "<category>/<slug>".
//
// WHY THIS FILE EXISTS
// Every calculator page used to inherit the site-wide default title from
// app/layout.tsx, so all 138 URLs shipped the identical <title> and meta
// description. Google cannot rank pages it cannot tell apart, and it was
// already rewriting our titles in search results.
//
// HOW TO USE IT
// - `title` is the page-specific part only. app/layout.tsx appends
//   " | Numrexo" through the metadata title template, so keep this under
//   ~52 characters or search results will truncate it.
// - `description` should be 140-158 characters, specific to this one tool,
//   and start with a verb. Never reuse a description across two pages.
// - `updatedAt` (YYYY-MM-DD) feeds <lastmod> in sitemap.xml. Bump it when
//   you meaningfully change the page so Google sees a real freshness signal.
//   Leave it out and the page falls back to SITE_DEFAULT_UPDATED_AT.
//
// Anything missing from this map still gets a unique (if generic) title via
// the fallback in lib/seo.ts, so adding a calculator never breaks the build.

export interface CalculatorSeo {
  title: string;
  description: string;
  keywords?: string[];
  updatedAt?: string;
}

export const SITE_DEFAULT_UPDATED_AT = "2026-09-05";

export const CALCULATOR_SEO: Record<string, CalculatorSeo> = {
  // ───────────────────────── HEALTH ─────────────────────────
  "health/bmi-calculator": {
    title: "BMI Calculator: Body Mass Index in Metric or Imperial",
    description:
      "Calculate your Body Mass Index from height and weight in metric or US units, then see where you fall on the WHO classification chart and what it means.",
    keywords: ["bmi calculator", "body mass index", "bmi chart", "healthy weight"],
  },
  "health/ideal-weight-calculator": {
    title: "Ideal Weight Calculator: Devine, Hamwi and Robinson",
    description:
      "Find your ideal body weight range using the Devine, Hamwi, Robinson and Miller formulas, compared side by side for your height, sex and frame size.",
    keywords: ["ideal weight calculator", "ideal body weight", "healthy weight range"],
  },
  "health/water-intake-calculator": {
    title: "Water Intake Calculator: Daily Hydration Needs",
    description:
      "Work out how much water to drink each day based on your body weight, activity level and climate, with a breakdown of what counts toward the total.",
    keywords: ["water intake calculator", "daily water intake", "hydration calculator"],
  },
  "health/body-type-calculator": {
    title: "Body Type Calculator: Ectomorph, Mesomorph, Endomorph",
    description:
      "Identify your body shape from bust, waist and hip measurements, and see which of the three somatotypes your frame is closest to and what that affects.",
    keywords: ["body type calculator", "body shape calculator", "somatotype"],
  },
  "health/pregnancy-due-date-calculator": {
    title: "Pregnancy Due Date Calculator: Week by Week",
    description:
      "Estimate your delivery date from your last menstrual period or conception date, with your current gestational week and each trimester milestone.",
    keywords: ["due date calculator", "pregnancy calculator", "gestational age"],
  },
  "health/ovulation-calculator": {
    title: "Ovulation Calculator: Fertile Window and Cycle Dates",
    description:
      "Find your likely ovulation day and six-day fertile window from your cycle length and last period, with the next three cycles mapped out for you.",
    keywords: ["ovulation calculator", "fertile window", "fertility calendar"],
  },
  "health/sleep-calculator": {
    title: "Sleep Calculator: Best Bedtime and Wake-Up Times",
    description:
      "Work out when to go to bed or set your alarm so you wake between 90-minute sleep cycles instead of in the middle of deep sleep.",
    keywords: ["sleep calculator", "sleep cycle calculator", "bedtime calculator"],
  },
  "health/nutrition-label-generator": {
    title: "Nutrition Label Generator: FDA-Style Facts Panel",
    description:
      "Build a printable nutrition facts panel from your ingredient amounts, with calories, macros and daily values laid out in the standard FDA format.",
    keywords: ["nutrition label generator", "nutrition facts label", "food label maker"],
  },
  "health/calorie-counter": {
    title: "Calorie Counter: Track Daily Intake by Meal",
    description:
      "Add foods meal by meal to total your calories, protein, carbs and fat for the day, and see how the running total compares with your target.",
    keywords: ["calorie counter", "calorie tracker", "daily calorie intake"],
  },

  // ───────────────────────── FITNESS ─────────────────────────
  "fitness/bmr-calculator": {
    title: "BMR Calculator: Basal Metabolic Rate and TDEE",
    description:
      "Calculate the calories your body burns at rest using the Mifflin-St Jeor equation, then scale it by activity level to get your daily maintenance calories.",
    keywords: ["bmr calculator", "basal metabolic rate", "tdee calculator"],
  },
  "fitness/body-fat-calculator": {
    title: "Body Fat Calculator: US Navy Tape Method",
    description:
      "Estimate your body fat percentage from neck, waist and hip measurements using the US Navy formula, with fat mass, lean mass and category ranges.",
    keywords: ["body fat calculator", "body fat percentage", "navy body fat"],
  },
  "fitness/calorie-burn-calculator": {
    title: "Calorie Burn Calculator: Calories Burned by Activity",
    description:
      "See how many calories you burn during running, cycling, swimming, lifting and 40 other activities, based on MET values, your weight and duration.",
    keywords: ["calories burned calculator", "exercise calorie calculator", "met calculator"],
  },
  "fitness/pace-calculator": {
    title: "Pace Calculator: Running Pace, Time and Distance",
    description:
      "Convert between pace, finish time and distance for any run, with split times for 5K, 10K, half marathon and marathon at the pace you enter.",
    keywords: ["pace calculator", "running pace", "marathon pace calculator"],
  },

  // ───────────────────────── FINANCE ─────────────────────────
  "finance/mortgage-calculator": {
    title: "Mortgage Calculator: Payment with Taxes, PMI and HOA",
    description:
      "Calculate your full monthly mortgage payment including principal, interest, property tax, homeowners insurance and PMI, plus total interest over the loan.",
    keywords: ["mortgage calculator", "monthly mortgage payment", "piti calculator", "home loan payment"],
  },
  "finance/amortization-calculator": {
    title: "Amortization Calculator: Full Payment Schedule",
    description:
      "Generate a complete month-by-month amortization schedule showing how each payment splits between principal and interest and what balance is left.",
    keywords: ["amortization calculator", "amortization schedule", "loan payoff schedule"],
  },
  "finance/loan-prepayment-calculator": {
    title: "Loan Prepayment Calculator: Interest You Save",
    description:
      "See exactly how much interest an extra payment saves and how many months it cuts off your loan, comparing lump-sum against monthly extra payments.",
    keywords: ["prepayment calculator", "extra payment calculator", "pay off loan early"],
  },
  "finance/loan-comparison-calculator": {
    title: "Loan Comparison Calculator: Compare Two Loan Offers",
    description:
      "Put two loan offers side by side and compare monthly payment, total interest and total cost, so a lower rate with higher fees does not fool you.",
    keywords: ["loan comparison calculator", "compare loans", "loan offer comparison"],
  },
  "finance/credit-score-estimator": {
    title: "Credit Score Estimator: Estimate Your Score Range",
    description:
      "Estimate your credit score band from payment history, credit utilisation, account age and recent enquiries, and see which factor is holding you back.",
    keywords: ["credit score estimator", "credit score calculator", "estimate credit score"],
  },
  "finance/emi-calculator": {
    title: "EMI Calculator: Monthly Loan Instalment and Interest",
    description:
      "Calculate the monthly instalment on any loan from amount, interest rate and tenure, with the full interest cost and a principal-versus-interest split.",
    keywords: ["emi calculator", "loan emi calculator", "monthly instalment calculator"],
  },
  "finance/home-loan-emi-calculator": {
    title: "Home Loan EMI Calculator with Interest Breakdown",
    description:
      "Work out the monthly instalment on a home loan, how much of each payment is interest in the early years, and what the loan costs you in total.",
    keywords: ["home loan emi calculator", "housing loan emi", "home loan interest"],
  },
  "finance/car-loan-emi-calculator": {
    title: "Car Loan EMI Calculator with Down Payment",
    description:
      "Calculate your car loan instalment for any down payment, rate and tenure, and see how a bigger down payment changes the monthly cost and total interest.",
    keywords: ["car loan emi calculator", "auto loan calculator", "vehicle loan emi"],
  },
  "finance/bike-loan-emi-calculator": {
    title: "Bike Loan EMI Calculator for Two-Wheelers",
    description:
      "Calculate the monthly instalment on a two-wheeler loan, compare tenures from 12 to 60 months, and see the total interest each option costs.",
    keywords: ["bike loan emi calculator", "two wheeler loan emi", "motorcycle loan"],
  },
  "finance/personal-loan-emi-calculator": {
    title: "Personal Loan EMI Calculator with Total Interest",
    description:
      "Find the monthly instalment on an unsecured personal loan, including processing fee, and see the effective cost against the advertised interest rate.",
    keywords: ["personal loan emi calculator", "personal loan interest", "unsecured loan emi"],
  },
  "finance/consumer-loan-emi-calculator": {
    title: "Consumer Loan EMI Calculator for Durables",
    description:
      "Calculate instalments on consumer durable finance for electronics, appliances and furniture, including no-cost EMI schemes and hidden processing charges.",
    keywords: ["consumer loan emi", "no cost emi calculator", "durable loan calculator"],
  },
  "finance/loan-eligibility-calculator": {
    title: "Loan Eligibility Calculator: How Much Can You Borrow",
    description:
      "Estimate the loan amount you qualify for from your income, existing obligations and the lender's debt-to-income limits, before you formally apply.",
    keywords: ["loan eligibility calculator", "how much loan can i get", "borrowing capacity"],
  },
  "finance/home-loan-eligibility-calculator": {
    title: "Home Loan Eligibility Calculator by Income",
    description:
      "See how large a home loan your income supports after existing EMIs, and how tenure, co-applicant income and rate changes move that ceiling.",
    keywords: ["home loan eligibility", "how much home loan", "mortgage affordability"],
  },
  "finance/student-loan-calculator": {
    title: "Student Loan Calculator: Repayment and Total Cost",
    description:
      "Calculate monthly repayments on an education loan across standard and extended terms, including the moratorium period and total interest you will pay.",
    keywords: ["student loan calculator", "education loan emi", "student loan repayment"],
  },
  "finance/fd-calculator": {
    title: "FD Calculator: Fixed Deposit Maturity and Interest",
    description:
      "Calculate the maturity value of a fixed deposit at any rate and tenure, comparing simple against quarterly compounded interest on the same amount.",
    keywords: ["fd calculator", "fixed deposit calculator", "fd maturity amount"],
  },
  "finance/rd-calculator": {
    title: "RD Calculator: Recurring Deposit Maturity Value",
    description:
      "Work out what a monthly recurring deposit grows to at maturity, with the interest earned separated from the total you actually deposited.",
    keywords: ["rd calculator", "recurring deposit calculator", "rd maturity"],
  },
  "finance/cagr-calculator": {
    title: "CAGR Calculator: Compound Annual Growth Rate",
    description:
      "Calculate the compound annual growth rate between a starting and ending value over any period, and compare it against absolute return on the same money.",
    keywords: ["cagr calculator", "compound annual growth rate", "annualised return"],
  },
  "finance/apy-calculator": {
    title: "APY Calculator: Annual Percentage Yield from APR",
    description:
      "Convert a nominal interest rate into annual percentage yield at daily, monthly or quarterly compounding, and see what compounding frequency is worth.",
    keywords: ["apy calculator", "annual percentage yield", "apr to apy"],
  },
  "finance/gratuity-calculator": {
    title: "Gratuity Calculator: Payout by Salary and Tenure",
    description:
      "Calculate the gratuity you are owed from your last drawn salary and years of service, with the statutory formula and the exemption limit applied.",
    keywords: ["gratuity calculator", "gratuity amount", "gratuity formula"],
  },
  "finance/epf-calculator": {
    title: "EPF Calculator: Provident Fund Corpus at Retirement",
    description:
      "Project your provident fund balance at retirement from your monthly contribution, employer share, expected salary growth and the current interest rate.",
    keywords: ["epf calculator", "provident fund calculator", "pf maturity"],
  },
  "finance/salary-budgeting-calculator": {
    title: "Salary Budget Calculator: 50/30/20 Monthly Split",
    description:
      "Split your take-home pay into needs, wants and savings using the 50/30/20 rule, and see where your current spending breaks the budget.",
    keywords: ["salary budget calculator", "50 30 20 rule", "monthly budget planner"],
  },
  "finance/rental-yield-calculator": {
    title: "Rental Yield Calculator: Gross and Net Return",
    description:
      "Calculate gross and net rental yield on an investment property after tax, maintenance, insurance and management fees, plus the cash-on-cash return.",
    keywords: ["rental yield calculator", "rental return", "property investment yield"],
  },
  "finance/water-bill-calculator": {
    title: "Water Bill Calculator: Monthly Usage and Cost",
    description:
      "Estimate your monthly water bill from household size and fixture usage, with slab-rate pricing applied and a breakdown of where the water goes.",
    keywords: ["water bill calculator", "water usage calculator", "monthly water cost"],
  },

  // ───────────────────────── INVESTMENT ─────────────────────────
  "investment/sip-calculator": {
    title: "SIP Calculator: Monthly Investment Returns",
    description:
      "Project what a monthly systematic investment grows to over time, with the invested amount and the returns shown separately at your expected rate.",
    keywords: ["sip calculator", "systematic investment plan", "monthly investment returns"],
  },
  "investment/lumpsum-calculator": {
    title: "Lumpsum Calculator: One-Time Investment Growth",
    description:
      "See what a single upfront investment becomes over any horizon at a given return rate, and compare that against spreading the same amount monthly.",
    keywords: ["lumpsum calculator", "one time investment", "lump sum returns"],
  },
  "investment/swp-calculator": {
    title: "SWP Calculator: Systematic Withdrawal and Balance",
    description:
      "Work out how long your corpus lasts under a fixed monthly withdrawal, and what balance remains after each year once returns are accounted for.",
    keywords: ["swp calculator", "systematic withdrawal plan", "withdrawal calculator"],
  },
  "investment/ppf-calculator": {
    title: "PPF Calculator: 15-Year Maturity and Interest",
    description:
      "Calculate the maturity value of a Public Provident Fund account over the full 15-year term, with the year-by-year balance and interest credited.",
    keywords: ["ppf calculator", "public provident fund", "ppf maturity amount"],
  },
  "investment/nps-calculator": {
    title: "NPS Calculator: Pension Corpus and Monthly Payout",
    description:
      "Project your National Pension System corpus at 60 and the monthly annuity it buys, based on your contribution, expected return and annuity rate.",
    keywords: ["nps calculator", "national pension system", "pension corpus calculator"],
  },
  "investment/xirr-calculator": {
    title: "XIRR Calculator: Returns on Irregular Cash Flows",
    description:
      "Calculate the annualised return on investments made at irregular dates and amounts, the way XIRR does in a spreadsheet but without the formula.",
    keywords: ["xirr calculator", "irregular returns", "annualised return calculator"],
  },
  "investment/capm-calculator": {
    title: "CAPM Calculator: Expected Return from Beta",
    description:
      "Calculate the expected return on a stock using the capital asset pricing model from the risk-free rate, market return and the stock's beta.",
    keywords: ["capm calculator", "expected return", "capital asset pricing model"],
  },

  // ───────────────────────── TAX ─────────────────────────
  "tax/sales-tax-calculator": {
    title: "Sales Tax Calculator: Add or Remove Tax from a Price",
    description:
      "Add sales tax to a price or strip it back out of a tax-inclusive total, with a reference table of standard rates across major countries.",
    keywords: ["sales tax calculator", "add sales tax", "reverse sales tax"],
  },
  "tax/vat-calculator": {
    title: "VAT Calculator: Add or Reverse VAT at Any Rate",
    description:
      "Calculate VAT on a net price or work backwards from a gross price at any rate, with standard and reduced rates for the UK, EU and beyond.",
    keywords: ["vat calculator", "reverse vat calculator", "add vat"],
  },
  "tax/gst-calculator": {
    title: "GST Calculator: Add or Remove GST from a Price",
    description:
      "Calculate GST on any amount at 5, 12, 18 or 28 percent, split into CGST and SGST, or reverse-calculate the base price from a GST-inclusive total.",
    keywords: ["gst calculator", "gst inclusive calculator", "cgst sgst calculator"],
  },
  "tax/ltcg-calculator": {
    title: "LTCG Calculator: Long-Term Capital Gains Tax",
    description:
      "Calculate long-term capital gains tax on equity and property sales, with the exemption threshold applied and indexation handled where it is allowed.",
    keywords: ["ltcg calculator", "capital gains tax", "long term capital gains"],
  },
  "tax/property-tax-calculator": {
    title: "Property Tax Calculator by City and Property Type",
    description:
      "Estimate annual property tax from built-up area, property age and usage type, using the assessment method your municipal corporation applies.",
    keywords: ["property tax calculator", "house tax calculator", "municipal tax"],
  },

  // ───────────────────────── MATH ─────────────────────────
  "math/percentage-calculator": {
    title: "Percentage Calculator: Increase, Decrease and Of",
    description:
      "Solve every common percentage question in one place: X percent of Y, what percent X is of Y, and the percentage increase or decrease between two numbers.",
    keywords: ["percentage calculator", "percent increase", "percentage change"],
  },
  "math/age-calculator": {
    title: "Age Calculator: Exact Age in Years, Months and Days",
    description:
      "Find your exact age in years, months and days from your date of birth, plus total weeks and days lived and how long until your next birthday.",
    keywords: ["age calculator", "date of birth calculator", "exact age"],
  },
  "math/fraction-calculator": {
    title: "Fraction Calculator: Add, Subtract, Multiply, Divide",
    description:
      "Do arithmetic on two fractions and get the answer in lowest terms, with each simplification step shown so you can follow the working.",
    keywords: ["fraction calculator", "add fractions", "simplify fractions"],
  },
  "math/decimal-calculator": {
    title: "Decimal to Fraction Converter with Steps",
    description:
      "Convert any decimal, terminating or repeating, into an exact fraction in lowest terms, with the algebra that gets you there written out.",
    keywords: ["decimal to fraction", "repeating decimal to fraction", "decimal converter"],
  },
  "math/ratio-calculator": {
    title: "Ratio Calculator: Simplify, Scale and Solve",
    description:
      "Simplify a ratio, scale it up or down, or solve for a missing term in a proportion, with results as a ratio, fraction and percentage.",
    keywords: ["ratio calculator", "simplify ratio", "proportion calculator"],
  },
  "math/pythagorean-calculator": {
    title: "Pythagorean Theorem Calculator: Solve Any Side",
    description:
      "Find the hypotenuse or either leg of a right triangle from the other two sides, with the area, perimeter and both non-right angles included.",
    keywords: ["pythagorean theorem calculator", "hypotenuse calculator", "right triangle"],
  },
  "math/area-calculator": {
    title: "Area Calculator for 8 Shapes with Formulas",
    description:
      "Calculate the area of a circle, triangle, rectangle, trapezoid, parallelogram, ellipse, sector or rhombus, with the formula shown for each shape.",
    keywords: ["area calculator", "area of shapes", "geometry area"],
  },
  "math/volume-calculator": {
    title: "Volume Calculator: Cube, Cylinder, Sphere and More",
    description:
      "Calculate the volume of a cube, cylinder, sphere, cone, pyramid or capsule from its dimensions, with surface area and the formula used.",
    keywords: ["volume calculator", "volume of a cylinder", "volume formulas"],
  },
  "math/slope-calculator": {
    title: "Slope Calculator: Gradient, Angle and Line Equation",
    description:
      "Find the slope between two points along with the angle of inclination, the distance between them and the line equation in slope-intercept form.",
    keywords: ["slope calculator", "gradient calculator", "slope between two points"],
  },
  "math/quadratic-solver": {
    title: "Quadratic Equation Solver with Working Shown",
    description:
      "Solve any quadratic equation for real or complex roots using the quadratic formula, with the discriminant, vertex and each step laid out.",
    keywords: ["quadratic equation solver", "quadratic formula calculator", "find roots"],
  },
  "math/statistics-calculator": {
    title: "Statistics Calculator: Mean, Median, Mode, Std Dev",
    description:
      "Paste a data set to get mean, median, mode, range, variance, standard deviation and quartiles, for both a sample and a full population.",
    keywords: ["statistics calculator", "mean median mode", "standard deviation calculator"],
  },
  "math/distance-calculator": {
    title: "Distance Formula Calculator for 2D and 3D Points",
    description:
      "Calculate the straight-line distance between two points in two or three dimensions, with the midpoint and the formula worked through step by step.",
    keywords: ["distance formula calculator", "distance between two points", "midpoint"],
  },
  "math/population-calculator": {
    title: "Population Growth Calculator: Future Projection",
    description:
      "Project a population forward at a compound growth rate, or work backwards to find the growth rate implied by two known population figures.",
    keywords: ["population growth calculator", "population projection", "growth rate"],
  },

  // ───────────────────────── CONVERSION ─────────────────────────
  "conversion/unit-converter": {
    title: "Unit Converter: Length, Weight, Volume and More",
    description:
      "Convert between units across length, mass, volume, area, speed, temperature and time in one tool, with exact conversion factors shown.",
    keywords: ["unit converter", "measurement converter", "metric imperial converter"],
  },
  "conversion/length-converter": {
    title: "Length Converter: Feet, Metres, Inches, Miles",
    description:
      "Convert between inches, feet, yards, miles, millimetres, centimetres, metres and kilometres instantly, with the exact factor for each pair.",
    keywords: ["length converter", "feet to meters", "inches to cm"],
  },
  "conversion/weight-converter": {
    title: "Weight Converter: Pounds, Kilograms, Ounces, Stone",
    description:
      "Convert weight between pounds, ounces, stone, kilograms, grams, tonnes and US tons, with results for every unit shown at once.",
    keywords: ["weight converter", "kg to lbs", "pounds to kilograms"],
  },
  "conversion/temperature-converter": {
    title: "Temperature Converter: Celsius, Fahrenheit, Kelvin",
    description:
      "Convert between Celsius, Fahrenheit, Kelvin and Rankine, with the conversion formula shown and common reference points for each scale.",
    keywords: ["temperature converter", "celsius to fahrenheit", "f to c"],
  },
  "conversion/area-converter": {
    title: "Area Converter: Square Feet, Metres, Acres, Hectares",
    description:
      "Convert area between square feet, square metres, square yards, acres and hectares, plus the regional land units still used in property listings.",
    keywords: ["area converter", "sq ft to sq m", "acres to hectares"],
  },
  "conversion/volume-converter": {
    title: "Volume Converter: Gallons, Litres, Cups, Millilitres",
    description:
      "Convert volume between US and imperial gallons, quarts, pints, cups, fluid ounces, litres and millilitres, with US and UK measures kept separate.",
    keywords: ["volume converter", "gallons to liters", "cups to ml"],
  },
  "conversion/speed-converter": {
    title: "Speed Converter: MPH, KM/H, Knots and M/S",
    description:
      "Convert speed between miles per hour, kilometres per hour, metres per second, knots and the speed of sound, all shown side by side.",
    keywords: ["speed converter", "mph to kmh", "knots to mph"],
  },
  "conversion/time-converter": {
    title: "Time Converter: Seconds, Minutes, Hours, Days, Years",
    description:
      "Convert any duration between milliseconds, seconds, minutes, hours, days, weeks, months and years, with every unit calculated at once.",
    keywords: ["time converter", "hours to minutes", "days to hours"],
  },
  "conversion/data-converter": {
    title: "Data Size Converter: Bytes, MB, GB, TB, Bits",
    description:
      "Convert digital storage between bits, bytes, kilobytes, megabytes, gigabytes and terabytes, in both decimal (1000) and binary (1024) bases.",
    keywords: ["data converter", "mb to gb", "bytes converter"],
  },
  "conversion/pressure-converter": {
    title: "Pressure Converter: PSI, Bar, Pascal, Atmosphere",
    description:
      "Convert pressure between psi, bar, pascal, kilopascal, atmospheres, torr and millimetres of mercury, with all results updating together.",
    keywords: ["pressure converter", "psi to bar", "pascal converter"],
  },
  "conversion/energy-converter": {
    title: "Energy Converter: Joules, Calories, kWh and BTU",
    description:
      "Convert energy between joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU and electronvolts in a single step.",
    keywords: ["energy converter", "joules to calories", "kwh converter"],
  },
  "conversion/power-converter": {
    title: "Power Converter: Watts, Kilowatts, Horsepower, BTU/h",
    description:
      "Convert power between watts, kilowatts, megawatts, metric and mechanical horsepower, and BTU per hour, with every unit shown together.",
    keywords: ["power converter", "watts to horsepower", "kw to hp"],
  },
  "conversion/angle-converter": {
    title: "Angle Converter: Degrees, Radians, Gradians, Turns",
    description:
      "Convert angles between degrees, radians, gradians, minutes, seconds and full turns, with radians shown as an exact multiple of pi.",
    keywords: ["angle converter", "degrees to radians", "radians to degrees"],
  },
  "conversion/currency-converter": {
    title: "Currency Converter: Live Exchange Rates",
    description:
      "Convert between world currencies at current exchange rates, with the rate used and the date it was quoted shown alongside the result.",
    keywords: ["currency converter", "exchange rate calculator", "money converter"],
  },

  // ───────────────────────── TIME ─────────────────────────
  "time/date-difference-calculator": {
    title: "Date Difference Calculator: Days Between Two Dates",
    description:
      "Count the days, weeks, months and years between two dates, with an option to include or exclude the end date and to count business days only.",
    keywords: ["date difference calculator", "days between dates", "date duration"],
  },
  "time/add-days-calculator": {
    title: "Add Days to Date Calculator: Future or Past Date",
    description:
      "Add or subtract days, weeks, months or years from any date to get the resulting date, with the day of the week and week number included.",
    keywords: ["add days to date", "date calculator", "days from today"],
  },
  "time/work-days-calculator": {
    title: "Working Days Calculator: Business Days Between Dates",
    description:
      "Count business days between two dates with weekends excluded and your own holiday list applied, plus the total calendar days for comparison.",
    keywords: ["working days calculator", "business days between dates", "workday calculator"],
  },
  "time/time-duration-calculator": {
    title: "Time Duration Calculator: Hours Between Two Times",
    description:
      "Calculate the duration between two times in hours and minutes, handling overnight shifts and subtracting unpaid breaks from the total.",
    keywords: ["time duration calculator", "hours between times", "time card calculator"],
  },
  "time/birthday-countdown": {
    title: "Birthday Countdown: Days Until Your Next Birthday",
    description:
      "Count down to your next birthday in days, hours and minutes, with the day of the week it falls on and the age you will be turning.",
    keywords: ["birthday countdown", "days until birthday", "birthday timer"],
  },
  "time/stopwatch": {
    title: "Online Stopwatch with Lap Times",
    description:
      "Start a precise online stopwatch with lap and split recording, accurate to hundredths of a second, running entirely in your browser tab.",
    keywords: ["online stopwatch", "stopwatch with laps", "timer stopwatch"],
  },
  "time/timer": {
    title: "Online Countdown Timer with Alarm",
    description:
      "Set a countdown timer for any duration with an audible alarm when it ends, with presets for common intervals and a full-screen display.",
    keywords: ["online timer", "countdown timer", "timer with alarm"],
  },

  // ───────────────────────── CONSTRUCTION ─────────────────────────
  "construction/concrete-calculator": {
    title: "Concrete Calculator: Volume, Bags and Mix Ratio",
    description:
      "Calculate the concrete volume a slab, footing or column needs, converted into cement, sand and aggregate quantities for your chosen mix ratio.",
    keywords: ["concrete calculator", "concrete volume", "cement bags calculator"],
  },
  "construction/paint-calculator": {
    title: "Paint Calculator: Litres Needed by Wall Area",
    description:
      "Work out how much paint a room needs from wall dimensions, minus doors and windows, adjusted for the number of coats and surface type.",
    keywords: ["paint calculator", "how much paint do i need", "paint coverage"],
  },
  "construction/flooring-calculator": {
    title: "Flooring Calculator: Material, Boxes and Waste",
    description:
      "Calculate the flooring area you need, how many boxes that means for your chosen tile or plank size, and the waste allowance to add on top.",
    keywords: ["flooring calculator", "tile calculator", "flooring square footage"],
  },
  "construction/wallpaper-calculator": {
    title: "Wallpaper Calculator: Rolls Needed by Room Size",
    description:
      "Work out how many wallpaper rolls a room needs from wall dimensions and roll size, with pattern repeat and openings accounted for.",
    keywords: ["wallpaper calculator", "wallpaper rolls needed", "wallpaper coverage"],
  },
  "construction/roofing-calculator": {
    title: "Roofing Calculator: Area, Pitch and Material",
    description:
      "Calculate true roof area from footprint and pitch, then convert it into the number of squares, sheets or tiles your roofing material needs.",
    keywords: ["roofing calculator", "roof area calculator", "roof pitch calculator"],
  },
  "construction/carpet-area-calculator": {
    title: "Carpet Area Calculator: Usable Floor Space",
    description:
      "Convert between carpet area, built-up area and super built-up area, so you know how much floor space a property listing actually gives you.",
    keywords: ["carpet area calculator", "carpet vs built up area", "usable area"],
  },
  "construction/built-up-area-calculator": {
    title: "Built-Up Area Calculator with Loading Factor",
    description:
      "Calculate built-up and super built-up area from carpet area using the loading factor, and see the price per usable square foot you are really paying.",
    keywords: ["built up area calculator", "super built up area", "loading factor"],
  },
  "construction/land-area-calculator": {
    title: "Land Area Calculator for Regular and Irregular Plots",
    description:
      "Calculate plot area from side lengths for rectangular, triangular and irregular four-sided land, with the result in every common land unit.",
    keywords: ["land area calculator", "plot area calculator", "land measurement"],
  },

  // ───────────────────────── EDUCATION ─────────────────────────
  "education/gpa-calculator": {
    title: "GPA Calculator: Semester and Cumulative GPA",
    description:
      "Calculate semester and cumulative GPA on the 4.0 scale from your course grades and credit hours, with an international conversion reference table.",
    keywords: ["gpa calculator", "cumulative gpa", "college gpa calculator"],
  },
  "education/cgpa-calculator": {
    title: "CGPA Calculator: CGPA to Percentage and Back",
    description:
      "Calculate CGPA from semester grades and convert between CGPA and percentage on the 10-point scale using your university's conversion factor.",
    keywords: ["cgpa calculator", "cgpa to percentage", "sgpa to cgpa"],
  },
  "education/grade-calculator": {
    title: "Grade Calculator: Course Grade from Assignments",
    description:
      "Add each assignment, quiz and exam with its weight to see your current course grade, and what you still need on what is left.",
    keywords: ["grade calculator", "course grade calculator", "assignment grade"],
  },
  "education/weighted-grade-calculator": {
    title: "Weighted Grade Calculator by Category Percentage",
    description:
      "Calculate your grade when categories carry different weights, such as homework at 20 percent and the final at 40, with the maths shown.",
    keywords: ["weighted grade calculator", "weighted average grade", "grade weights"],
  },
  "education/final-grade-calculator": {
    title: "Final Grade Calculator: Score Needed on the Final",
    description:
      "Work out exactly what you need to score on the final exam to reach your target course grade, given your current mark and the exam's weight.",
    keywords: ["final grade calculator", "what do i need on my final", "final exam grade"],
  },
  "education/percentage-marks-calculator": {
    title: "Marks Percentage Calculator with Grade Bands",
    description:
      "Convert marks obtained out of total marks into a percentage across any number of subjects, with the grade band and aggregate shown.",
    keywords: ["percentage calculator marks", "marks to percentage", "exam percentage"],
  },
  "education/attendance-calculator": {
    title: "Attendance Calculator: Classes Needed to Hit 75%",
    description:
      "Check your current attendance percentage and find out how many more classes you must attend, or can safely miss, to stay above the requirement.",
    keywords: ["attendance calculator", "attendance percentage", "75 percent attendance"],
  },
  "education/college-cost-calculator": {
    title: "College Cost Calculator: Total Four-Year Cost",
    description:
      "Add tuition, housing, books and living costs to project the full cost of a degree, with annual inflation applied and aid subtracted.",
    keywords: ["college cost calculator", "cost of college", "tuition calculator"],
  },
  "education/scholarship-calculator": {
    title: "Scholarship Calculator: Net Cost After Awards",
    description:
      "Subtract scholarships, grants and waivers from total cost of attendance to see what you are actually left paying each year out of pocket.",
    keywords: ["scholarship calculator", "net cost of college", "financial aid calculator"],
  },

  // ───────────────────────── BUSINESS ─────────────────────────
  "business/profit-margin-calculator": {
    title: "Profit Margin Calculator: Gross, Net and Markup",
    description:
      "Calculate gross margin, net margin and markup from cost and selling price, or work backwards to the price a target margin requires.",
    keywords: ["profit margin calculator", "gross margin", "margin vs markup"],
  },
  "business/markup-calculator": {
    title: "Markup Calculator: Selling Price from Cost",
    description:
      "Find the selling price a given markup percentage produces, and see the profit margin that markup translates into, which is not the same number.",
    keywords: ["markup calculator", "markup percentage", "cost to selling price"],
  },
  "business/discount-calculator": {
    title: "Discount Calculator: Final Price and Amount Saved",
    description:
      "Calculate the sale price after one or more discounts, the amount saved, and what a stacked discount really works out to as a single percentage.",
    keywords: ["discount calculator", "percentage off calculator", "sale price calculator"],
  },
  "business/roi-calculator": {
    title: "ROI Calculator: Return on Investment and Annualised",
    description:
      "Calculate return on investment as a percentage and in absolute terms, with the annualised return so investments of different lengths compare fairly.",
    keywords: ["roi calculator", "return on investment", "annualised roi"],
  },
  "business/break-even-calculator": {
    title: "Break-Even Calculator: Units and Revenue Needed",
    description:
      "Find how many units you must sell to cover fixed and variable costs, the revenue that represents, and your contribution margin per unit.",
    keywords: ["break even calculator", "break even point", "contribution margin"],
  },
  "business/tip-calculator": {
    title: "Tip Calculator: Split the Bill by Person",
    description:
      "Calculate the tip at any percentage and split the total between any number of people, with rounding options and per-person amounts.",
    keywords: ["tip calculator", "bill split calculator", "gratuity calculator restaurant"],
  },
  "business/sales-commission-calculator": {
    title: "Sales Commission Calculator: Flat and Tiered Rates",
    description:
      "Calculate commission on sales at a flat rate or across tiers, with base salary added to show total earnings for the period.",
    keywords: ["commission calculator", "sales commission", "tiered commission"],
  },
  "business/invoice-generator": {
    title: "Free Invoice Generator: Printable PDF Invoices",
    description:
      "Build a professional invoice with line items, tax and payment terms, then print or save it as a PDF. Nothing is stored on our servers.",
    keywords: ["invoice generator", "free invoice maker", "printable invoice"],
  },

  // ───────────────────────── COOKING ─────────────────────────
  "cooking/recipe-converter": {
    title: "Recipe Converter: Scale Servings Up or Down",
    description:
      "Rescale a recipe from its original serving count to the number you actually need, with every ingredient quantity converted to sensible measures.",
    keywords: ["recipe converter", "recipe scaler", "adjust recipe servings"],
  },
  "cooking/cooking-time-calculator": {
    title: "Cooking Time Calculator: Roasting Time by Weight",
    description:
      "Calculate roasting time and oven temperature by meat type, weight and how well done you want it, with resting time and target internal temperature.",
    keywords: ["cooking time calculator", "roasting time calculator", "meat cooking time"],
  },
  "cooking/oven-temperature-converter": {
    title: "Oven Temperature Converter: F, C and Gas Mark",
    description:
      "Convert oven temperatures between Fahrenheit, Celsius, fan-assisted Celsius and gas mark, with a full reference chart for common settings.",
    keywords: ["oven temperature converter", "gas mark converter", "fan oven conversion"],
  },
  "cooking/baking-converter": {
    title: "Baking Converter: Cups to Grams by Ingredient",
    description:
      "Convert baking measurements between cups, grams, ounces and tablespoons using the real density of each ingredient, not one generic factor.",
    keywords: ["baking converter", "cups to grams", "baking measurement conversion"],
  },
  "cooking/food-expiry-calculator": {
    title: "Food Expiry Calculator: Safe Storage Times",
    description:
      "Find how long a food keeps in the pantry, fridge or freezer from its purchase or opening date, with the safe-storage guideline for each.",
    keywords: ["food expiry calculator", "food storage times", "how long does food last"],
  },

  // ───────────────────────── TRAVEL ─────────────────────────
  "travel/fuel-cost-calculator": {
    title: "Fuel Cost Calculator: Trip Cost by Distance",
    description:
      "Calculate what fuel a trip will cost from distance, fuel price and your vehicle's efficiency, with the cost per mile and a round-trip total.",
    keywords: ["fuel cost calculator", "gas cost calculator", "trip fuel cost"],
  },
  "travel/travel-budget-calculator": {
    title: "Travel Budget Calculator: Full Trip Cost Planner",
    description:
      "Add flights, accommodation, food, transport and activities to build a full trip budget, split per day and per traveller with a contingency line.",
    keywords: ["travel budget calculator", "trip cost calculator", "vacation budget"],
  },
  "travel/flight-time-calculator": {
    title: "Flight Time Calculator: Duration Between Airports",
    description:
      "Estimate flight duration between two airports from great-circle distance and cruising speed, with the time-zone difference applied to arrival time.",
    keywords: ["flight time calculator", "flight duration", "travel time between cities"],
  },
  "travel/hotel-cost-calculator": {
    title: "Hotel Cost Calculator: Total Stay with Taxes",
    description:
      "Calculate the true cost of a hotel stay including nightly rate, taxes, resort fees and parking, split per person and per night.",
    keywords: ["hotel cost calculator", "hotel price calculator", "total stay cost"],
  },
  "travel/luggage-allowance-calculator": {
    title: "Luggage Allowance Calculator: Excess Baggage Fees",
    description:
      "Check your bag against airline size and weight limits and see what excess baggage will cost before you get to the check-in desk.",
    keywords: ["luggage allowance calculator", "baggage fee calculator", "excess baggage"],
  },

  // ───────────────────────── SCIENCE ─────────────────────────
  "science/dst-calculator": {
    title: "Distance Speed Time Calculator: Solve for Any One",
    description:
      "Enter any two of distance, speed and time to solve for the third, in metric or imperial units, with the formula and rearrangement shown.",
    keywords: ["distance speed time calculator", "speed calculator", "travel time calculator"],
  },
};

// Category hub pages. Same rules: unique title, 140-158 char description.
export const CATEGORY_SEO: Record<string, CalculatorSeo> = {
  health: {
    title: "Health Calculators: BMI, Ideal Weight, Due Date",
    description:
      "Free health calculators for BMI, ideal weight, water intake, sleep cycles, pregnancy due dates and ovulation. No sign-up, nothing stored, works on mobile.",
  },
  fitness: {
    title: "Fitness Calculators: BMR, TDEE, Body Fat, Pace",
    description:
      "Free fitness calculators for basal metabolic rate, daily calorie needs, body fat percentage, calories burned by activity and running pace.",
  },
  finance: {
    title: "Finance Calculators: Mortgage, Loan, EMI, Deposits",
    description:
      "Free finance calculators for mortgage payments, loan instalments, amortization schedules, prepayment savings, deposits and credit score estimates.",
  },
  investment: {
    title: "Investment Calculators: SIP, Lumpsum, XIRR, CAPM",
    description:
      "Free investment calculators for monthly and one-time investments, systematic withdrawals, retirement corpus, irregular cash-flow returns and expected return.",
  },
  tax: {
    title: "Tax Calculators: Sales Tax, VAT, GST, Capital Gains",
    description:
      "Free tax calculators to add or reverse sales tax, VAT and GST, plus long-term capital gains and property tax estimates with current rate tables.",
  },
  math: {
    title: "Math Calculators: Percentage, Fractions, Geometry",
    description:
      "Free math calculators for percentages, fractions, ratios, area, volume, slope, quadratic equations and statistics, each with the working shown.",
  },
  conversion: {
    title: "Unit Converters: Length, Weight, Volume, Temperature",
    description:
      "Free unit converters for length, weight, volume, area, speed, temperature, pressure, energy, power, data size and angles, with exact conversion factors.",
  },
  education: {
    title: "Education Calculators: GPA, CGPA, Grades, Attendance",
    description:
      "Free calculators for GPA and CGPA, weighted and final grades, marks percentage, attendance requirements, college cost and scholarship net cost.",
  },
  construction: {
    title: "Construction Calculators: Concrete, Paint, Flooring",
    description:
      "Free construction calculators for concrete volume and cement bags, paint coverage, flooring and tiles, wallpaper rolls, roofing area and land area.",
  },
  business: {
    title: "Business Calculators: Margin, Markup, ROI, Break-Even",
    description:
      "Free business calculators for profit margin, markup, discounts, return on investment, break-even point, sales commission, tips and invoices.",
  },
  science: {
    title: "Science Calculators: Distance, Speed and Time",
    description:
      "Free science calculators for physics and motion problems, starting with distance, speed and time, each showing the formula and the rearrangement used.",
  },
  time: {
    title: "Date and Time Calculators: Days Between, Duration",
    description:
      "Free date and time tools to count days between dates, add days to a date, count business days, measure durations, plus a stopwatch and countdown timer.",
  },
  cooking: {
    title: "Cooking Calculators: Recipe Scaling, Oven Temps",
    description:
      "Free kitchen calculators to scale recipes, convert cups to grams by ingredient, convert oven temperatures and gas marks, and check food storage times.",
  },
  travel: {
    title: "Travel Calculators: Fuel Cost, Budget, Flight Time",
    description:
      "Free travel calculators for trip fuel cost, full holiday budgets, flight duration between airports, hotel stay totals and airline baggage fees.",
  },
};
