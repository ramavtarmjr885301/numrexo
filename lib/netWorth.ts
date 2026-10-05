// lib/netWorth.ts
//
// Pure, framework-free math for the Net Worth Calculator, kept out of the
// component so it can be unit-tested with plain node.
//
// Federal Reserve data: medians below are from Table 2 ("Family median and mean
// net worth, selected characteristics of families, 2019 and 2022 surveys") in
// "Changes in U.S. Family Finances from 2019 to 2022: Evidence from the Survey of
// Consumer Finances", Federal Reserve Bulletin, October 2023. Values are MEDIANS
// (not means) for all U.S. families, in 2022 dollars.

export const MAX_AMOUNT = 1e12;

export type AssetId =
  | "cash"
  | "savings"
  | "brokerage"
  | "retirement"
  | "home"
  | "otherRealEstate"
  | "vehicles"
  | "business"
  | "otherAssets";

export type LiabilityId =
  | "mortgage"
  | "heloc"
  | "auto"
  | "student"
  | "creditCards"
  | "personal"
  | "otherDebts";

export type AssetGroupId =
  | "cashSavings"
  | "investments"
  | "retirement"
  | "realEstate"
  | "vehicles"
  | "business"
  | "other";

export const ASSET_GROUPS: { id: AssetGroupId; label: string; color: string }[] = [
  { id: "cashSavings", label: "Cash & savings", color: "#0ea5e9" },
  { id: "investments", label: "Taxable investments", color: "#6366f1" },
  { id: "retirement", label: "Retirement accounts", color: "#10b981" },
  { id: "realEstate", label: "Real estate", color: "#f59e0b" },
  { id: "vehicles", label: "Vehicles", color: "#ec4899" },
  { id: "business", label: "Business ownership", color: "#8b5cf6" },
  { id: "other", label: "Other assets", color: "#64748b" },
];

export const ASSET_TO_GROUP: Record<AssetId, AssetGroupId> = {
  cash: "cashSavings",
  savings: "cashSavings",
  brokerage: "investments",
  retirement: "retirement",
  home: "realEstate",
  otherRealEstate: "realEstate",
  vehicles: "vehicles",
  business: "business",
  otherAssets: "other",
};

export const LIABILITY_LABELS: Record<LiabilityId, string> = {
  mortgage: "Mortgage balance",
  heloc: "Home equity loan / HELOC",
  auto: "Auto loans",
  student: "Student loans",
  creditCards: "Credit card balances",
  personal: "Personal loans",
  otherDebts: "Other debts",
};

/** Liquid assets = cash + savings + taxable brokerage. */
export const LIQUID_ASSET_IDS: AssetId[] = ["cash", "savings", "brokerage"];

/** Turn whatever is in an input box into a safe amount: empty / NaN -> 0, negatives -> 0, capped at MAX_AMOUNT. */
export function sanitizeAmount(raw: string | number | null | undefined): number {
  if (raw === null || raw === undefined || raw === "") return 0;
  const n = typeof raw === "number" ? raw : parseFloat(raw);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(n, MAX_AMOUNT);
}

export interface NetWorthInputs {
  assets: Partial<Record<AssetId, number>>;
  liabilities: Partial<Record<LiabilityId, number>>;
  customAssets: { label: string; amount: number }[];
  customLiabilities: { label: string; amount: number }[];
}

export interface AllocationSlice {
  id: string;
  label: string;
  color: string;
  value: number;
  pct: number; // share of total assets, 0-100
}

export interface LiabilitySlice {
  id: string;
  label: string;
  value: number;
  pct: number; // share of total liabilities, 0-100
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  liquidAssets: number;
  /** Total liabilities / total assets x 100. null when there are no assets to divide by. */
  debtToAssetPct: number | null;
  allocation: AllocationSlice[];
  largestGroup: AllocationSlice | null;
  liabilityBreakdown: LiabilitySlice[];
}

const sum = (xs: number[]): number => xs.reduce((a, b) => a + b, 0);

export function computeNetWorth(input: NetWorthInputs): NetWorthResult {
  const a = (id: AssetId): number => sanitizeAmount(input.assets[id]);
  const l = (id: LiabilityId): number => sanitizeAmount(input.liabilities[id]);

  const assetIds = Object.keys(ASSET_TO_GROUP) as AssetId[];
  const customAssetTotal = sum(input.customAssets.map((c) => sanitizeAmount(c.amount)));

  const groupTotals: Record<AssetGroupId, number> = {
    cashSavings: 0,
    investments: 0,
    retirement: 0,
    realEstate: 0,
    vehicles: 0,
    business: 0,
    other: 0,
  };
  for (const id of assetIds) groupTotals[ASSET_TO_GROUP[id]] += a(id);
  groupTotals.other += customAssetTotal;

  const totalAssets = sum(Object.values(groupTotals));

  const liabilityIds = Object.keys(LIABILITY_LABELS) as LiabilityId[];
  const liabilityItems: { id: string; label: string; value: number }[] = liabilityIds.map((id) => ({
    id,
    label: LIABILITY_LABELS[id],
    value: l(id),
  }));
  input.customLiabilities.forEach((c, i) => {
    liabilityItems.push({
      id: `custom-${i}`,
      label: c.label.trim() || `Custom liability ${i + 1}`,
      value: sanitizeAmount(c.amount),
    });
  });
  const totalLiabilities = sum(liabilityItems.map((x) => x.value));

  const allocation: AllocationSlice[] = ASSET_GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    color: g.color,
    value: groupTotals[g.id],
    pct: totalAssets > 0 ? (groupTotals[g.id] / totalAssets) * 100 : 0,
  })).filter((s) => s.value > 0);

  let largestGroup: AllocationSlice | null = null;
  for (const s of allocation) if (!largestGroup || s.value > largestGroup.value) largestGroup = s;

  const liabilityBreakdown: LiabilitySlice[] = liabilityItems
    .filter((x) => x.value > 0)
    .map((x) => ({ ...x, pct: totalLiabilities > 0 ? (x.value / totalLiabilities) * 100 : 0 }))
    .sort((p, q) => q.value - p.value);

  return {
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
    liquidAssets: sum(LIQUID_ASSET_IDS.map(a)),
    debtToAssetPct: totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : null,
    allocation,
    largestGroup,
    liabilityBreakdown,
  };
}

// ─── Federal Reserve SCF 2022 benchmark ──────────────────────────────────────

export interface ScfBracket {
  label: string;
  minAge: number;
  maxAge: number; // inclusive
  median: number; // dollars, 2022 dollars
}

/** Median family net worth by age of family head, 2022 SCF, Table 2 (thousands of 2022 dollars x 1,000). */
export const SCF_2022_MEDIAN_NET_WORTH: ScfBracket[] = [
  { label: "Under 35", minAge: 0, maxAge: 34, median: 39000 },
  { label: "35 to 44", minAge: 35, maxAge: 44, median: 135600 },
  { label: "45 to 54", minAge: 45, maxAge: 54, median: 247200 },
  { label: "55 to 64", minAge: 55, maxAge: 64, median: 364500 },
  { label: "65 to 74", minAge: 65, maxAge: 74, median: 409900 },
  { label: "75 and older", minAge: 75, maxAge: 200, median: 335600 },
];

export const SCF_SOURCE = {
  label:
    "Federal Reserve Board, \"Changes in U.S. Family Finances from 2019 to 2022: Evidence from the Survey of Consumer Finances,\" Federal Reserve Bulletin, October 2023 (Table 2, median family net worth by age of family head, 2022 dollars)",
  url: "https://www.federalreserve.gov/publications/october-2023-changes-in-us-family-finances-from-2019-to-2022.htm",
};

/** Whole-number age 18-120 from an input string, or null when it is empty / invalid. */
export function parseAge(raw: string): number | null {
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return null;
  const age = Math.floor(n);
  return age >= 18 && age <= 120 ? age : null;
}

export function scfBracketForAge(age: number | null): ScfBracket | null {
  if (age === null) return null;
  return SCF_2022_MEDIAN_NET_WORTH.find((b) => age >= b.minAge && age <= b.maxAge) ?? null;
}

export interface BenchmarkComparison {
  bracket: ScfBracket;
  difference: number; // user net worth minus median
  status: "above" | "below" | "at";
}

export function compareWithMedian(netWorth: number, age: number | null): BenchmarkComparison | null {
  const bracket = scfBracketForAge(age);
  if (!bracket) return null;
  const difference = netWorth - bracket.median;
  return {
    bracket,
    difference,
    status: Math.abs(difference) < 0.5 ? "at" : difference > 0 ? "above" : "below",
  };
}
