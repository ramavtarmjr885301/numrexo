// lib/emi.ts
//
// One tested EMI formula, shared by the loan calculators' static example
// tables. Those tables used to be typed in by hand (and in rupees), which is
// how a "$5M home loan" ended up on a US page. Computing each row from the
// formula means the example numbers are always exactly right for whatever
// market/currency is selected.

export interface EmiRow {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

/** Standard reducing-balance EMI. `annualRatePct` is e.g. 8.5, `months` the tenure. */
export function calcEmi(principal: number, annualRatePct: number, months: number): EmiRow {
  const r = annualRatePct / 12 / 100;
  const emi =
    r === 0
      ? principal / months
      : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal };
}
