"use client";

import { useState, useEffect } from "react";
import ResultBox from "@/components/common/ResultBox";

// Simplified exchange rates (in production, use an API)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.5,
  INR: 83.5,
  CNY: 7.24,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.91,
  SGD: 1.35,
  AED: 3.67,
  SAR: 3.75,
};

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState<any>(null);

  const convert = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const fromRate = EXCHANGE_RATES[fromCurrency];
    const toRate = EXCHANGE_RATES[toCurrency];
    const convertedAmount = (amt / fromRate) * toRate;

    const fromCurrencyData = CURRENCIES.find(c => c.code === fromCurrency);
    const toCurrencyData = CURRENCIES.find(c => c.code === toCurrency);

    setResult({
      convertedAmount: convertedAmount.toFixed(2),
      fromAmount: amt.toFixed(2),
      fromCurrency,
      toCurrency,
      fromSymbol: fromCurrencyData?.symbol,
      toSymbol: toCurrencyData?.symbol,
      rate: (toRate / fromRate).toFixed(4),
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result) {
      convert();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Currency Converter</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Amount</label>
            <input
              type="number"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={swapCurrencies}
              className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              🔄
            </button>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={convert}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Convert →
          </button>
        </div>
      </div>

      <ResultBox
        title="Converted Amount"
        isEmpty={!result}
        emptyIcon="💱"
        emptyText="Enter amount and press Convert"
        mainResult={result ? {
          label: `${result.fromSymbol}${result.fromAmount} ${result.fromCurrency} =`,
          value: `${result.toSymbol}${result.convertedAmount} ${result.toCurrency}`,
          color: "text-teal-400",
        } : undefined}
        extraRows={result ? [
          { label: "Exchange Rate", value: `1 ${result.fromCurrency} = ${result.rate} ${result.toCurrency}` },
        ] : undefined}
      />
    </div>
  );
}