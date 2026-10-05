"use client";

import { useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";
import {
  MAX_AMOUNT,
  SCF_2022_MEDIAN_NET_WORTH,
  SCF_SOURCE,
  compareWithMedian,
  computeNetWorth,
  parseAge,
  sanitizeAmount,
  type AssetId,
  type LiabilityId,
} from "@/lib/netWorth";

// ─── Field definitions ────────────────────────────────────────────────────────

interface FieldDef<T extends string> {
    id: T;
    label: string;
    hint: string;
}

const ASSET_FIELDS: FieldDef<AssetId>[] = [
    { id: "cash", label: "Cash & checking", hint: "Checking accounts and cash on hand" },
    { id: "savings", label: "Savings & emergency fund", hint: "Savings accounts, money market accounts, CDs" },
    { id: "brokerage", label: "Brokerage / taxable investments", hint: "Stocks, ETFs and funds held outside retirement accounts" },
    { id: "retirement", label: "Retirement accounts (401(k), IRA, pension)", hint: "Current balances; pre-tax money has not been taxed yet" },
    { id: "home", label: "Home value (market value)", hint: "What it would likely sell for today, not what you paid" },
    { id: "otherRealEstate", label: "Other real estate", hint: "Rental property, vacation home or land, at market value" },
    { id: "vehicles", label: "Vehicles", hint: "Current resale value, not the sticker price" },
    { id: "business", label: "Business ownership value", hint: "Your share of a business, estimated conservatively" },
    { id: "otherAssets", label: "Other assets (collectibles, valuables)", hint: "Only items you could realistically sell" },
];

const LIABILITY_FIELDS: FieldDef<LiabilityId>[] = [
    { id: "mortgage", label: "Mortgage balance", hint: "Principal still owed, not the monthly payment" },
    { id: "heloc", label: "Home equity loan / HELOC", hint: "Outstanding balance only, not the credit limit" },
    { id: "auto", label: "Auto loans", hint: "Remaining payoff amount on all vehicle loans" },
    { id: "student", label: "Student loans", hint: "Federal and private balances combined" },
    { id: "creditCards", label: "Credit card balances", hint: "What you owe today across all cards" },
    { id: "personal", label: "Personal loans", hint: "Including loans from family, if you owe them" },
    { id: "otherDebts", label: "Other debts", hint: "Medical bills, tax debt, buy-now-pay-later and the like" },
];

const MAX_CUSTOM = 5;

const EXAMPLE_ASSETS: Record<AssetId, string> = {
    cash: "8000",
    savings: "22000",
    brokerage: "35000",
    retirement: "90000",
    home: "380000",
    otherRealEstate: "",
    vehicles: "18000",
    business: "",
    otherAssets: "",
};

const EXAMPLE_LIABILITIES: Record<LiabilityId, string> = {
    mortgage: "290000",
    heloc: "",
    auto: "9000",
    student: "24000",
    creditCards: "3500",
    personal: "",
    otherDebts: "",
};

const EXAMPLE_AGE = "35";

const EMPTY_ASSETS: Record<AssetId, string> = {
    cash: "", savings: "", brokerage: "", retirement: "", home: "",
    otherRealEstate: "", vehicles: "", business: "", otherAssets: "",
};

const EMPTY_LIABILITIES: Record<LiabilityId, string> = {
    mortgage: "", heloc: "", auto: "", student: "", creditCards: "", personal: "", otherDebts: "",
};

interface CustomRow {
    id: number;
    label: string;
    amount: string;
}

// Worked example used in the explanatory text below. Computed with the same function the
// calculator uses, so the prose can never drift from what the tool shows on first paint.
const toNum = (record: Record<string, string>) =>
    Object.fromEntries(Object.entries(record).map(([k, v]) => [k, sanitizeAmount(v)]));
const EXAMPLE_RESULT = computeNetWorth({
    assets: toNum(EXAMPLE_ASSETS),
    liabilities: toNum(EXAMPLE_LIABILITIES),
    customAssets: [],
    customLiabilities: [],
});
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const EXAMPLE_HOME_EQUITY = sanitizeAmount(EXAMPLE_ASSETS.home) - sanitizeAmount(EXAMPLE_LIABILITIES.mortgage);
const EXAMPLE_COMPARE = compareWithMedian(EXAMPLE_RESULT.netWorth, parseAge(EXAMPLE_AGE));

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is net worth, and how is it calculated?",
        a: "Net worth is the difference between what you own and what you owe. Add up the current market value of everything you own (assets), add up every balance you owe (liabilities), and subtract: net worth = total assets minus total liabilities. A positive number means you own more than you owe; a negative number means the reverse.",
    },
    {
        q: "What should I count as an asset?",
        a: "Count anything with a realistic resale or cash value today: bank and brokerage balances, retirement accounts, the market value of your home and any other property, vehicles at resale value, your share of a business, and valuables you could actually sell. Leave out things that only have sentimental value, and leave out future income you have not yet earned, such as expected Social Security benefits or next year's salary.",
    },
    {
        q: "Should I include my home and my retirement accounts?",
        a: "Yes, both are part of your net worth, and for most households they are the two largest items. Just be aware they are not equally easy to spend. Home equity is only accessible by selling, borrowing against it or downsizing, and retirement balances may trigger taxes and penalties if withdrawn early. That is why this calculator also shows liquid assets separately.",
    },
    {
        q: "Is a negative net worth bad?",
        a: "It is common, especially early in a career. Someone with student loans, a car loan and a new mortgage can easily owe more than they own, even while making every payment on time. What matters more is the direction: a negative number that is rising each year, with manageable payments and an emergency fund, tells a very different story from one that is falling because balances are growing.",
    },
    {
        q: "What are liquid assets, and why does the calculator show them?",
        a: "Liquid assets are the ones you can turn into spendable cash quickly and without a big loss in value. Here that means cash and checking, savings and taxable brokerage accounts. A household can have a high net worth and still be short on cash if most of it sits in a house or retirement accounts, so looking at both numbers together gives a more honest picture of your flexibility.",
    },
    {
        q: "How accurate does my home value need to be?",
        a: "Use a realistic estimate of what the home would sell for today, based on recent sales of similar homes nearby or an online estimate cross-checked against a local agent's opinion. Online estimates can be off by several percent in either direction. Since the home is often the biggest asset, it is worth rounding down a little rather than up, and updating the figure once or twice a year.",
    },
    {
        q: "What is the debt-to-asset ratio?",
        a: "It is your total liabilities divided by your total assets, shown as a percentage. At 40%, you owe 40 cents for every dollar you own. At 100% or more, your debts equal or exceed your assets, which is the same thing as having a zero or negative net worth. There is no universal 'good' number: a young homeowner with a large mortgage will naturally sit higher than a retiree who has paid off their house. Watch the trend over time.",
    },
    {
        q: "How does my net worth compare with other Americans my age?",
        a: "If you use US dollars and enter your age, the calculator shows the median family net worth for your age bracket from the Federal Reserve's 2022 Survey of Consumer Finances. A median is the middle family: half of families are above it and half below. It is not the average (the mean), which is pulled far higher by a small number of very wealthy households. The figures are for all US families in 2022 dollars, so treat the comparison as context, not a target.",
    },
    {
        q: "How often should I calculate my net worth?",
        a: "Once or twice a year is enough for most people, for example at New Year and mid-year, or alongside tax preparation. Checking more often mostly measures stock market noise. Use the same method and the same valuation sources each time so that changes reflect real progress rather than a change in how you estimated things.",
    },
    {
        q: "Does this calculator work in currencies other than US dollars, and is my data stored?",
        a: "Yes. Use the currency selector to switch between US dollars, pounds, euros, Canadian dollars, Australian dollars and rupees; the arithmetic is identical. The age-based benchmark is shown only for US dollars because it describes US families. Everything is calculated in your browser as you type, and the numbers you enter are not sent to or stored on our servers.",
    },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

const FAQ_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
});

const WEBAPP_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Net Worth Calculator",
    description:
        "Add up your assets and liabilities to see your net worth, liquid assets, debt-to-asset ratio and asset allocation, with a Federal Reserve median comparison by age for US users.",
    url: "https://numrexo.com/finance/net-worth-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Net worth from assets minus liabilities",
        "Liquid assets and debt-to-asset ratio",
        "Asset allocation and liability breakdown",
        "Comparison with Federal Reserve median net worth by age (US dollars)",
        "Custom asset and liability rows",
        "Works in six currencies",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Net Worth Calculator", item: "https://numrexo.com/finance/net-worth-calculator" },
    ],
});

// ─── Small presentational pieces (module level so inputs keep focus while typing) ──

const INPUT_CLASS =
    "w-full pl-9 pr-3 py-2.5 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

/** Keep what is typed inside 0..MAX_AMOUNT. Empty stays empty (treated as 0). */
function clampInput(raw: string): string {
    if (raw === "") return "";
    const n = parseFloat(raw);
    if (!Number.isFinite(n)) return "";
    if (n < 0) return "0";
    if (n > MAX_AMOUNT) return String(MAX_AMOUNT);
    return raw;
}

function AmountRow({
    id, label, hint, value, symbol, onChange,
}: {
    id: string;
    label: string;
    hint?: string;
    value: string;
    symbol: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold text-ink-soft mb-1">{label}</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft pointer-events-none" aria-hidden="true">{symbol}</span>
                <input
                    id={id}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={MAX_AMOUNT}
                    step="any"
                    placeholder="0"
                    value={value}
                    onChange={(e) => onChange(clampInput(e.target.value))}
                    className={INPUT_CLASS}
                />
            </div>
            {hint && <p className="text-[11px] text-ink-soft/80 mt-1">{hint}</p>}
        </div>
    );
}

function CustomRows({
    kind, rows, symbol, onChange, onAdd, onRemove,
}: {
    kind: "asset" | "liability";
    rows: CustomRow[];
    symbol: string;
    onChange: (id: number, patch: Partial<CustomRow>) => void;
    onAdd: () => void;
    onRemove: (id: number) => void;
}) {
    return (
        <div className="pt-3 border-t border-hairline">
            {rows.map((row, i) => (
                <div key={row.id} className="mb-3 grid grid-cols-[1fr_auto] gap-2 items-end">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                            <label htmlFor={`custom-${kind}-label-${row.id}`} className="block text-xs font-semibold text-ink-soft mb-1">
                                Custom {kind} {i + 1} name
                            </label>
                            <input
                                id={`custom-${kind}-label-${row.id}`}
                                type="text"
                                maxLength={40}
                                placeholder={kind === "asset" ? "e.g., Crypto" : "e.g., Tax bill"}
                                value={row.label}
                                onChange={(e) => onChange(row.id, { label: e.target.value })}
                                className="w-full px-3 py-2.5 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor={`custom-${kind}-amount-${row.id}`} className="block text-xs font-semibold text-ink-soft mb-1">
                                Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft pointer-events-none" aria-hidden="true">{symbol}</span>
                                <input
                                    id={`custom-${kind}-amount-${row.id}`}
                                    type="number"
                                    inputMode="decimal"
                                    min={0}
                                    max={MAX_AMOUNT}
                                    step="any"
                                    placeholder="0"
                                    value={row.amount}
                                    onChange={(e) => onChange(row.id, { amount: clampInput(e.target.value) })}
                                    className={INPUT_CLASS}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(row.id)}
                        aria-label={`Remove custom ${kind} ${i + 1}`}
                        className="px-3 py-2.5 rounded-lg border border-hairline text-ink-soft text-sm hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                disabled={rows.length >= MAX_CUSTOM}
                className="text-sm font-medium text-blue-600 hover:underline disabled:text-ink-faint disabled:no-underline disabled:cursor-not-allowed"
            >
                + Add custom {kind}
                {rows.length >= MAX_CUSTOM ? ` (limit of ${MAX_CUSTOM} reached)` : ""}
            </button>
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NetWorthCalculator() {
    const { symbol, money, currency } = useCurrency();

    // State starts from constants only (no window / localStorage), so server and first client render match
    // and the worked example is on screen immediately.
    const [assets, setAssets] = useState<Record<AssetId, string>>(EXAMPLE_ASSETS);
    const [liabilities, setLiabilities] = useState<Record<LiabilityId, string>>(EXAMPLE_LIABILITIES);
    const [age, setAge] = useState(EXAMPLE_AGE);
    const [customAssets, setCustomAssets] = useState<CustomRow[]>([]);
    const [customLiabilities, setCustomLiabilities] = useState<CustomRow[]>([]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const nextRowId = useRef(1);

    const result = useMemo(
        () =>
            computeNetWorth({
                assets: toNum(assets),
                liabilities: toNum(liabilities),
                customAssets: customAssets.map((c) => ({ label: c.label, amount: sanitizeAmount(c.amount) })),
                customLiabilities: customLiabilities.map((c) => ({ label: c.label, amount: sanitizeAmount(c.amount) })),
            }),
        [assets, liabilities, customAssets, customLiabilities],
    );

    const parsedAge = parseAge(age);
    const comparison = useMemo(() => compareWithMedian(result.netWorth, parsedAge), [result.netWorth, parsedAge]);

    // Money with a proper leading minus ("-$12,000"), never "$-12,000".
    const fmt = (value: number): string => {
        const v = Math.abs(value) < 0.005 ? 0 : value;
        return v < 0 ? `-${money(Math.abs(v))}` : money(v);
    };

    const resetToExample = () => {
        setAssets(EXAMPLE_ASSETS);
        setLiabilities(EXAMPLE_LIABILITIES);
        setAge(EXAMPLE_AGE);
        setCustomAssets([]);
        setCustomLiabilities([]);
    };

    const clearAll = () => {
        setAssets(EMPTY_ASSETS);
        setLiabilities(EMPTY_LIABILITIES);
        setAge("");
        setCustomAssets([]);
        setCustomLiabilities([]);
    };

    const addRow = (setter: Dispatch<SetStateAction<CustomRow[]>>) => {
        setter((rows) => (rows.length >= MAX_CUSTOM ? rows : [...rows, { id: nextRowId.current++, label: "", amount: "" }]));
    };
    const patchRow = (setter: Dispatch<SetStateAction<CustomRow[]>>) => (id: number, patch: Partial<CustomRow>) => {
        setter((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    };
    const removeRow = (setter: Dispatch<SetStateAction<CustomRow[]>>) => (id: number) => {
        setter((rows) => rows.filter((r) => r.id !== id));
    };

    const isEmpty = result.totalAssets === 0 && result.totalLiabilities === 0;
    const netColor = result.netWorth < 0 ? "text-red-400" : result.netWorth > 0 ? "text-emerald-400" : "text-blue-400";
    const ratioText = result.debtToAssetPct === null ? "n/a" : `${result.debtToAssetPct.toFixed(1)}%`;
    const statusLine =
        result.netWorth > 0
            ? "You own more than you owe."
            : result.netWorth < 0
                ? "You currently owe more than you own."
                : "Your assets and liabilities are equal.";

    const allocationSummary = result.allocation.map((s) => `${s.label} ${s.pct.toFixed(0)} percent`).join(", ");

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/finance" itemProp="item" className="hover:text-ink-soft">
                            <span itemProp="name">Finance Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-ink-soft">Net Worth Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
                {/* ── Inputs ── */}
                <div className="space-y-6">
                    <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-hairline">
                            <h3 className="font-semibold">Net Worth Calculator</h3>
                            <p className="text-xs text-ink-soft mt-1">
                                Pre-filled with an example household. Replace the numbers with your own, or clear everything and start fresh.
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <CurrencySwitcher className="pb-2 border-b border-hairline" />

                            <div>
                                <label htmlFor="nw-age" className="block text-xs font-semibold text-ink-soft mb-1">Your age (optional)</label>
                                <input
                                    id="nw-age"
                                    type="number"
                                    inputMode="numeric"
                                    min={18}
                                    max={120}
                                    step={1}
                                    placeholder="e.g., 35"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <p className="text-[11px] text-ink-soft/80 mt-1">
                                    {age !== "" && parsedAge === null
                                        ? "Enter a whole-number age between 18 and 120."
                                        : "Used only for the age comparison below (US dollars)."}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={resetToExample}
                                    className="flex-1 py-2.5 rounded-lg bg-surface border border-hairline text-ink-soft text-sm font-semibold hover:text-ink hover:border-blue-600 transition-colors"
                                >
                                    Reset to example
                                </button>
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="flex-1 py-2.5 rounded-lg bg-surface border border-hairline text-ink-soft text-sm font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Assets */}
                    <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-hairline flex items-center justify-between gap-3">
                            <div>
                                <h3 className="font-semibold">Assets</h3>
                                <p className="text-xs text-ink-soft mt-1">Everything you own, at today&apos;s market value</p>
                            </div>
                            <span className="text-sm font-mono font-semibold text-emerald-600 whitespace-nowrap">{fmt(result.totalAssets)}</span>
                        </div>
                        <div className="p-6 space-y-4">
                            {ASSET_FIELDS.map((f) => (
                                <AmountRow
                                    key={f.id}
                                    id={`nw-asset-${f.id}`}
                                    label={f.label}
                                    hint={f.hint}
                                    symbol={symbol}
                                    value={assets[f.id]}
                                    onChange={(v) => setAssets((p) => ({ ...p, [f.id]: v }))}
                                />
                            ))}
                            <CustomRows
                                kind="asset"
                                rows={customAssets}
                                symbol={symbol}
                                onChange={patchRow(setCustomAssets)}
                                onAdd={() => addRow(setCustomAssets)}
                                onRemove={removeRow(setCustomAssets)}
                            />
                        </div>
                    </div>

                    {/* Liabilities */}
                    <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-hairline flex items-center justify-between gap-3">
                            <div>
                                <h3 className="font-semibold">Liabilities</h3>
                                <p className="text-xs text-ink-soft mt-1">Everything you owe, as the balance due today</p>
                            </div>
                            <span className="text-sm font-mono font-semibold text-red-600 whitespace-nowrap">{fmt(result.totalLiabilities)}</span>
                        </div>
                        <div className="p-6 space-y-4">
                            {LIABILITY_FIELDS.map((f) => (
                                <AmountRow
                                    key={f.id}
                                    id={`nw-liability-${f.id}`}
                                    label={f.label}
                                    hint={f.hint}
                                    symbol={symbol}
                                    value={liabilities[f.id]}
                                    onChange={(v) => setLiabilities((p) => ({ ...p, [f.id]: v }))}
                                />
                            ))}
                            <CustomRows
                                kind="liability"
                                rows={customLiabilities}
                                symbol={symbol}
                                onChange={patchRow(setCustomLiabilities)}
                                onAdd={() => addRow(setCustomLiabilities)}
                                onRemove={removeRow(setCustomLiabilities)}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Results ── */}
                <div className="lg:sticky lg:top-24" aria-live="polite">
                    <ResultBox
                        title="Your Net Worth"
                        isEmpty={isEmpty}
                        emptyIcon="🏦"
                        emptyText="Enter your assets and liabilities to see your net worth"
                        mainResult={{
                            label: "Your net worth",
                            value: fmt(result.netWorth),
                            color: netColor,
                        }}
                        extraRows={[
                            { label: "Total assets", value: fmt(result.totalAssets), valueColor: "text-emerald-400" },
                            { label: "Total liabilities", value: fmt(result.totalLiabilities), valueColor: "text-red-400" },
                            { label: "Liquid assets", value: fmt(result.liquidAssets) },
                            {
                                label: "Debt-to-asset ratio",
                                value: ratioText,
                                valueColor: result.debtToAssetPct !== null && result.debtToAssetPct > 100 ? "text-red-400" : "text-white",
                            },
                            {
                                label: "Largest asset category",
                                value: result.largestGroup ? `${result.largestGroup.label} (${result.largestGroup.pct.toFixed(0)}%)` : "None yet",
                            },
                        ]}
                    >
                        <div className="text-xs text-gray-400 mt-3">{statusLine}</div>
                    </ResultBox>
                </div>
            </div>

            {/* ── Breakdown ── */}
            {!isEmpty && (
                <section className="mb-8" aria-labelledby="nw-breakdown-heading">
                    <h2 id="nw-breakdown-heading" className="text-xl font-semibold text-ink mb-4">Where your money sits</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Asset allocation */}
                        <div className="bg-surface border border-hairline rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-ink mb-1">Asset allocation</h3>
                            <p className="text-xs text-ink-soft mb-4">Share of your {fmt(result.totalAssets)} in total assets</p>
                            {result.allocation.length === 0 ? (
                                <p className="text-sm text-ink-soft">Add some assets to see how they are spread.</p>
                            ) : (
                                <>
                                    <div
                                        role="img"
                                        aria-label={`Asset allocation: ${allocationSummary}`}
                                        className="flex h-5 w-full overflow-hidden rounded-full bg-hairline"
                                    >
                                        {result.allocation.map((s) => (
                                            <div key={s.id} style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                                        ))}
                                    </div>
                                    <ul className="mt-4 space-y-2">
                                        {result.allocation.map((s) => (
                                            <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                                                <span className="flex items-center gap-2 text-ink-soft">
                                                    <span className="inline-block w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} aria-hidden="true" />
                                                    {s.label}
                                                </span>
                                                <span className="font-mono text-ink whitespace-nowrap">
                                                    {fmt(s.value)} <span className="text-ink-soft">· {s.pct.toFixed(1)}%</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        {/* Liabilities breakdown */}
                        <div className="bg-surface border border-hairline rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-ink mb-1">Liabilities breakdown</h3>
                            <p className="text-xs text-ink-soft mb-4">Share of your {fmt(result.totalLiabilities)} in total debt</p>
                            {result.liabilityBreakdown.length === 0 ? (
                                <p className="text-sm text-ink-soft">No debts entered. Nothing to break down.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {result.liabilityBreakdown.map((s) => (
                                        <li key={s.id}>
                                            <div className="flex items-center justify-between gap-3 text-sm mb-1">
                                                <span className="text-ink-soft">{s.label}</span>
                                                <span className="font-mono text-ink whitespace-nowrap">
                                                    {fmt(s.value)} <span className="text-ink-soft">· {s.pct.toFixed(1)}%</span>
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-hairline overflow-hidden" aria-hidden="true">
                                                <div className="h-full rounded-full bg-red-400" style={{ width: `${s.pct}%` }} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── How you compare ── */}
            <section className="mb-8" aria-labelledby="nw-compare-heading">
                <h2 id="nw-compare-heading" className="text-xl font-semibold text-ink mb-4">How you compare</h2>
                {currency !== "USD" ? (
                    <div className="bg-surface border border-hairline rounded-xl p-5 text-sm text-ink-soft leading-relaxed">
                        Benchmarks are shown for US users only. The age comparison uses US Federal Reserve data in US dollars, so it is hidden
                        while another currency is selected. Switch the currency to USD to see it.
                    </div>
                ) : comparison ? (
                    <div className="bg-surface border border-hairline rounded-xl p-5">
                        <p className="text-sm text-ink-soft leading-relaxed mb-4">
                            For US families whose head of household is <strong className="text-ink">{comparison.bracket.label}</strong>, the
                            median net worth in the Federal Reserve&apos;s 2022 Survey of Consumer Finances was{" "}
                            <strong className="text-ink">{fmt(comparison.bracket.median)}</strong>. Your net worth of{" "}
                            <strong className="text-ink">{fmt(result.netWorth)}</strong> is{" "}
                            {comparison.status === "at" ? (
                                <strong className="text-ink">about equal to that median</strong>
                            ) : (
                                <strong className={comparison.status === "above" ? "text-emerald-600" : "text-red-600"}>
                                    {fmt(Math.abs(comparison.difference))} {comparison.status} the median
                                </strong>
                            )}
                            .
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <caption className="text-left text-xs text-ink-soft pb-2">
                                    Median family net worth by age of family head, 2022 SCF (2022 dollars)
                                </caption>
                                <thead>
                                    <tr className="border-b border-hairline">
                                        <th scope="col" className="text-left py-2 pr-4 text-ink-soft font-semibold">Age of family head</th>
                                        <th scope="col" className="text-right py-2 text-ink-soft font-semibold">Median net worth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SCF_2022_MEDIAN_NET_WORTH.map((b) => {
                                        const mine = b.label === comparison.bracket.label;
                                        return (
                                            <tr key={b.label} className={`border-b border-hairline ${mine ? "bg-blue-50" : ""}`}>
                                                <td className={`py-2 pr-4 ${mine ? "font-semibold text-ink" : "text-ink-soft"}`}>
                                                    {b.label}
                                                    {mine && <span className="ml-2 text-xs text-blue-600">your bracket</span>}
                                                </td>
                                                <td className={`py-2 text-right font-mono ${mine ? "font-semibold text-ink" : "text-ink-soft"}`}>
                                                    {fmt(b.median)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-ink-soft leading-relaxed mt-4">
                            These are <strong>medians</strong> (the middle family, not the average) for <strong>all US families</strong>,
                            in <strong>2022 dollars</strong>. They are not adjusted for price changes since 2022, and they cover very different
                            households, so your own situation may not resemble the typical family in your bracket. This is context, not advice
                            or a target. Source: {SCF_SOURCE.label}.{" "}
                            <a href={SCF_SOURCE.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                View the Federal Reserve report
                            </a>
                            .
                        </p>
                    </div>
                ) : (
                    <div className="bg-surface border border-hairline rounded-xl p-5 text-sm text-ink-soft leading-relaxed">
                        Enter your age (18 or older) in the form above to see the median net worth for your age bracket from the Federal Reserve&apos;s
                        2022 Survey of Consumer Finances.
                    </div>
                )}
            </section>

            {/* ── About ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About the Net Worth Calculator</h2>
                <p className="text-ink-soft text-sm leading-relaxed mb-3">
                    <strong className="text-ink">Net worth</strong> is the simplest honest scorecard in personal finance: everything you own,
                    minus everything you owe. Income tells you what comes in each month and a budget tells you where it goes, but neither shows
                    whether you are actually getting ahead. Net worth does, because it only moves when you build assets or pay down debt, or when
                    the value of what you hold changes.
                </p>
                <div className="bg-surface border border-hairline rounded-xl p-4 mb-3 text-center">
                    <p className="text-sm font-mono text-ink">Net worth = total assets − total liabilities</p>
                </div>
                <p className="text-ink-soft text-sm leading-relaxed mb-3">
                    This calculator goes a little further than the subtraction. It also reports your <strong className="text-ink">liquid assets</strong> (cash,
                    savings and taxable investments you could reach quickly), your <strong className="text-ink">debt-to-asset ratio</strong>, and which
                    category holds the biggest share of your wealth. Those extra numbers answer practical questions the headline figure can&apos;t: how
                    easily could I cover a surprise bill, and how exposed am I to a single asset such as my house?
                </p>
                <p className="text-ink-soft text-sm leading-relaxed">
                    Everything runs in your browser as you type. It is built around common US account types, such as 401(k)s, IRAs, HELOCs and
                    auto loans, but the arithmetic is the same anywhere, so you can switch to another currency with the selector above the form.
                </p>
            </section>

            {/* ── How to use ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Calculator</h2>
                <ol className="space-y-3 list-none">
                    {[
                        <><strong className="text-ink-soft">Gather current balances.</strong> Open your bank, brokerage, retirement and loan accounts and note today&apos;s balances. Statements from the last month are fine.</>,
                        <><strong className="text-ink-soft">Enter your assets.</strong> Fill in every row that applies and leave the rest blank; an empty box counts as zero. Use market value for your home, other property and vehicles, not what you paid.</>,
                        <><strong className="text-ink-soft">Enter your liabilities.</strong> Type the balance you would owe if you paid off each debt today. For credit cards, use the current balance rather than the minimum payment.</>,
                        <><strong className="text-ink-soft">Add anything unusual.</strong> Use the custom rows (up to five for assets and five for liabilities) for items that do not fit a standard row, such as cryptocurrency or a tax bill.</>,
                        <><strong className="text-ink-soft">Optionally add your age.</strong> With US dollars selected, you will see how your figure sits against the Federal Reserve&apos;s median for your age bracket.</>,
                        <><strong className="text-ink-soft">Read the results and save a snapshot.</strong> Note the date and your net worth, then repeat in six or twelve months to see your trend.</>,
                    ].map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-ink-soft leading-relaxed">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
            </section>

            {/* ── Worked example ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Worked Example: A Household in Their Mid-30s</h2>
                <p className="text-ink-soft text-sm leading-relaxed mb-3">
                    The calculator opens with this example so you can see how the numbers fit together. The household owns {usd(EXAMPLE_RESULT.totalAssets)} in
                    assets: $8,000 in checking, $22,000 in savings, $35,000 in a brokerage account, $90,000 in retirement accounts, a $380,000 home and
                    an $18,000 car. They owe {usd(EXAMPLE_RESULT.totalLiabilities)}: a $290,000 mortgage, a $9,000 auto loan, $24,000 in student loans and a $3,500
                    credit card balance.
                </p>
                <ul className="space-y-2 text-sm text-ink-soft leading-relaxed">
                    <li><strong className="text-ink">Net worth:</strong> {usd(EXAMPLE_RESULT.totalAssets)} − {usd(EXAMPLE_RESULT.totalLiabilities)} = <strong className="text-ink">{usd(EXAMPLE_RESULT.netWorth)}</strong>.</li>
                    <li><strong className="text-ink">Liquid assets:</strong> $8,000 + $22,000 + $35,000 = {usd(EXAMPLE_RESULT.liquidAssets)}, only a small slice of the total.</li>
                    <li><strong className="text-ink">Debt-to-asset ratio:</strong> {usd(EXAMPLE_RESULT.totalLiabilities)} ÷ {usd(EXAMPLE_RESULT.totalAssets)} = {EXAMPLE_RESULT.debtToAssetPct?.toFixed(1)}%.</li>
                    <li><strong className="text-ink">Concentration:</strong> the home is {EXAMPLE_RESULT.largestGroup?.pct.toFixed(0)}% of all assets, and home equity ({usd(380000)} − {usd(290000)}) is just {usd(EXAMPLE_HOME_EQUITY)} of it.</li>
                    {EXAMPLE_COMPARE && (
                        <li>
                            <strong className="text-ink">Age comparison:</strong> at age 35 the household&apos;s {usd(EXAMPLE_RESULT.netWorth)} is {usd(Math.abs(EXAMPLE_COMPARE.difference))} {EXAMPLE_COMPARE.status} the {usd(EXAMPLE_COMPARE.bracket.median)} median for the {EXAMPLE_COMPARE.bracket.label} bracket in the 2022 SCF.
                        </li>
                    )}
                </ul>
                <p className="text-ink-soft text-sm leading-relaxed mt-3">
                    The takeaway is a typical one: a decent net worth on paper, but mostly tied up in a house and retirement accounts, with about {usd(EXAMPLE_RESULT.liquidAssets)} available
                    for emergencies and near-term goals.
                </p>
            </section>

            {/* ── What to include ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">What to Include and How to Value It</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th scope="col" className="text-left py-3 px-4 text-ink-soft font-semibold">Item</th>
                                <th scope="col" className="text-left py-3 px-4 text-ink-soft font-semibold">How to value it</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Checking and savings", "Current balance. Deposits at FDIC-insured banks are insured up to $250,000 per depositor, per bank, per ownership category."],
                                ["Brokerage account", "Current market value of holdings, as shown on your latest statement or app."],
                                ["401(k), IRA, pension", "Current account balance. Remember that pre-tax balances will be taxed when withdrawn, so the spendable amount is lower."],
                                ["Home", "Realistic sale price today, from recent comparable sales. Do not use the purchase price or the assessed value for tax purposes."],
                                ["Vehicles", "Private-party resale value from a used-car pricing guide, based on age, mileage and condition."],
                                ["Business", "A conservative estimate, such as a multiple of annual profit, or what a buyer would plausibly pay. Leave it at zero if you have no idea."],
                                ["Valuables", "What you could actually sell them for, after fees. Appraisals are a ceiling, not a price."],
                                ["Mortgage and loans", "Payoff balance on your latest statement, not the original loan amount or the monthly payment."],
                                ["Credit cards", "Total balance owed today, including any amount you normally pay off at the end of the month."],
                            ].map(([item, how]) => (
                                <tr key={item} className="border-b border-hairline last:border-0 align-top">
                                    <th scope="row" className="text-left py-3 px-4 font-medium text-ink whitespace-nowrap">{item}</th>
                                    <td className="py-3 px-4 text-ink-soft leading-relaxed">{how}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── How to read your result ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Read Your Result</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-emerald-600 mb-2">If your net worth is positive</h3>
                        <p className="text-ink-soft text-xs leading-relaxed">
                            You own more than you owe. The size of the number matters less than the trend and the mix: a positive figure made almost
                            entirely of one illiquid asset is more fragile than the same figure spread across savings, investments and home equity.
                        </p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-600 mb-2">If your net worth is negative</h3>
                        <p className="text-ink-soft text-xs leading-relaxed">
                            Your debts exceed your assets. This is common after graduate school, a business setback or a recent home purchase with a
                            small down payment. It is a starting point to measure from rather than a verdict. Focus on the direction of travel,
                            and on whether the debts carry high interest rates.
                        </p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">Liquid assets</h3>
                        <p className="text-ink-soft text-xs leading-relaxed">
                            This is the part you could reach within days without selling your home or paying retirement-account penalties. Compare
                            it with a few months of essential expenses to judge how well you could handle a job loss or a large repair. This figure is
                            gross of debt; it does not subtract what you owe.
                        </p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">Debt-to-asset ratio</h3>
                        <p className="text-ink-soft text-xs leading-relaxed">
                            Lower generally means more cushion. Above 100% means liabilities exceed assets. The ratio naturally runs high in the years
                            after buying a home and falls as the mortgage is paid down, so compare it with your own past figures more than with other
                            people&apos;s.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Ways to grow ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Ways to Grow Your Net Worth</h2>
                <p className="text-ink-soft text-sm leading-relaxed mb-3">
                    Net worth rises through only three levers: save more, owe less, or own things that grow in value. General ideas that apply to
                    many households (none of this is personal advice):
                </p>
                <ul className="space-y-2">
                    {[
                        ["Pay down high-interest debt first.", "Eliminating a credit card balance is a guaranteed return equal to its interest rate, which is hard to beat elsewhere."],
                        ["Build an emergency fund.", "A cash cushion keeps a surprise expense from becoming new debt or a forced sale of investments at a bad time."],
                        ["Capture any employer match.", "If your employer matches retirement contributions, contributing enough to get the full match is effectively part of your pay."],
                        ["Automate saving and investing.", "Regular automatic transfers remove the temptation to time the market or spend the money first."],
                        ["Keep investment costs low.", "Fees compound just like returns do, in the wrong direction. Compare expense ratios before choosing funds."],
                        ["Grow your income.", "Skills, raises, and side income raise the ceiling on how much you can save, which is often a bigger lever than trimming small expenses."],
                        ["Avoid depreciating purchases funded by debt.", "A car loan on a vehicle that loses value faster than you repay it can lower net worth for years."],
                    ].map(([title, body]) => (
                        <li key={title} className="flex gap-3 text-sm text-ink-soft">
                            <span className="text-blue-600 mt-0.5" aria-hidden="true">↗</span>
                            <span><strong className="text-ink">{title}</strong> {body}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── Common mistakes ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Common Mistakes to Avoid</h2>
                <ul className="space-y-2">
                    {[
                        ["Valuing your home at the purchase price.", "Markets move. Use what comparable homes nearby are selling for now, which may be higher or lower than what you paid."],
                        ["Counting vehicles at sticker price.", "A car loses value quickly. Use the private-party resale value for its age and mileage."],
                        ["Forgetting small debts.", "Store cards, buy-now-pay-later plans, medical bills and money owed to relatives all count, and they add up."],
                        ["Mixing up the credit limit and the balance.", "Only the amount you actually owe is a liability. A $20,000 limit with a $2,000 balance is a $2,000 liability."],
                        ["Treating retirement balances as fully spendable.", "They count toward net worth, but taxes and early-withdrawal penalties can reduce what you actually receive."],
                        ["Counting future income as an asset.", "Expected salary, bonuses, inheritances and benefits you have not received do not belong in the calculation."],
                        ["Over-valuing a business or collectibles.", "A number you hope to get is not a number you have. Use conservative resale-based values."],
                        ["Checking too often.", "Day-to-day swings in market prices say little about your progress. A yearly or twice-yearly check is usually enough."],
                    ].map(([title, body]) => (
                        <li key={title} className="flex gap-3 text-sm text-ink-soft">
                            <span className="text-red-600 mt-0.5" aria-hidden="true">⚠️</span>
                            <span><strong className="text-ink">{title}</strong> {body}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── FAQ ── */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button
                                type="button"
                                aria-expanded={openFaq === i}
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-ink-soft leading-relaxed">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Disclaimer ── */}
            <section className="mb-8">
                <div className="bg-cream border border-hairline rounded-xl p-4">
                    <p className="text-xs text-ink-soft leading-relaxed">
                        <strong className="text-ink">Disclaimer:</strong> This calculator gives an educational estimate based on the numbers you enter. It is not
                        financial, investment, tax or legal advice, and it cannot account for taxes, fees, market changes or your personal circumstances. Asset
                        values are estimates and may differ from what you would receive in a sale. Consider speaking with a qualified financial professional before
                        making decisions.
                    </p>
                </div>
            </section>
        </>
    );
}
