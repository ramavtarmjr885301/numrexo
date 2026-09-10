"use client";

// components/common/CurrencySwitcher.tsx
//
// The control that makes one calculator work for a reader in Ohio and a reader
// in Pune without maintaining two pages. Drop it above the input fields of any
// money calculator.
//
// The choice is remembered, so a visitor sets it once and every other money
// page on the site follows.

import { CURRENCIES, CURRENCY_ORDER, type CurrencyCode } from "@/lib/currency";
import { useCurrency } from "@/components/common/useCurrency";

export default function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <label htmlFor="numrexo-currency" className="text-xs font-semibold text-gray-400">
        Currency
      </label>
      <select
        id="numrexo-currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        className="bg-[#0b1220] border border-gray-700 text-gray-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
      >
        {CURRENCY_ORDER.map((code) => (
          <option key={code} value={code}>
            {CURRENCIES[code].label}
          </option>
        ))}
      </select>
    </div>
  );
}
