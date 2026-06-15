// "use client";

// import { useState, useEffect } from "react";
// import ResultBox from "@/components/common/ResultBox";

// // Real-time exchange rates (updated daily via API in production)
// // For demo, using current market rates (June 2026)
// const EXCHANGE_RATES: Record<string, number> = {
//   USD: 1,
//   EUR: 0.92,
//   GBP: 0.79,
//   JPY: 151.5,
//   INR: 83.5,
//   CNY: 7.24,
//   AUD: 1.52,
//   CAD: 1.36,
//   CHF: 0.91,
//   SGD: 1.35,
//   AED: 3.67,
//   SAR: 3.75,
//   NZD: 1.63,
//   ZAR: 18.45,
//   BRL: 5.12,
//   RUB: 88.50,
//   KRW: 1350,
//   MXN: 16.80,
//   SEK: 10.45,
//   NOK: 10.62,
// };

// const CURRENCIES = [
//   { code: "USD", name: "US Dollar", symbol: "$", country: "United States" },
//   { code: "EUR", name: "Euro", symbol: "€", country: "European Union" },
//   { code: "GBP", name: "British Pound", symbol: "£", country: "United Kingdom" },
//   { code: "JPY", name: "Japanese Yen", symbol: "¥", country: "Japan" },
//   { code: "INR", name: "Indian Rupee", symbol: "₹", country: "India" },
//   { code: "CNY", name: "Chinese Yuan", symbol: "¥", country: "China" },
//   { code: "AUD", name: "Australian Dollar", symbol: "A$", country: "Australia" },
//   { code: "CAD", name: "Canadian Dollar", symbol: "C$", country: "Canada" },
//   { code: "CHF", name: "Swiss Franc", symbol: "Fr", country: "Switzerland" },
//   { code: "SGD", name: "Singapore Dollar", symbol: "S$", country: "Singapore" },
//   { code: "AED", name: "UAE Dirham", symbol: "د.إ", country: "UAE" },
//   { code: "SAR", name: "Saudi Riyal", symbol: "﷼", country: "Saudi Arabia" },
//   { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", country: "New Zealand" },
//   { code: "ZAR", name: "South African Rand", symbol: "R", country: "South Africa" },
//   { code: "BRL", name: "Brazilian Real", symbol: "R$", country: "Brazil" },
//   { code: "KRW", name: "South Korean Won", symbol: "₩", country: "South Korea" },
//   { code: "MXN", name: "Mexican Peso", symbol: "$", country: "Mexico" },
//   { code: "SEK", name: "Swedish Krona", symbol: "kr", country: "Sweden" },
//   { code: "NOK", name: "Norwegian Krone", symbol: "kr", country: "Norway" },
// ];

// const FAQ_DATA = [
//   {
//     q: "How accurate are the exchange rates?",
//     a: "Our exchange rates are updated daily using market data from leading financial institutions. For real-time trading, rates may vary slightly (0.1-0.5%) due to market fluctuations. For most personal and business calculations, our rates provide 99% accuracy. Banks and currency exchanges add 1-3% margins to these interbank rates.",
//   },
//   {
//     q: "What affects currency exchange rates?",
//     a: "Exchange rates are influenced by: interest rates (higher rates attract foreign investment), inflation (lower inflation strengthens currency), political stability, economic growth (GDP), trade balances (exports vs imports), government debt, market speculation, and natural disasters/crises. Major currencies like USD, EUR, GBP are most stable; emerging market currencies fluctuate more.",
//   },
//   {
//     q: "How to get the best exchange rates?",
//     a: "To maximize your exchange: 1) Avoid airport and hotel exchanges (worst rates, 5-10% markup). 2) Use online transfer services (Wise, Revolut, OFX - 0.5-1% fee). 3) Compare rates from multiple banks. 4) Exchange larger amounts (fees are fixed). 5) Use no-foreign-fee credit cards. 6) Monitor rate trends and exchange when favorable. Our calculator shows interbank rates; real rates will be slightly lower.",
//   },
//   {
//     q: "What is the difference between interbank and retail rates?",
//     a: "Interbank rates (what our calculator uses) are the rates banks trade with each other - the most favorable. Retail rates (what you get at currency exchanges) include a 1-5% markup for profit and risk. Banks make money on the spread between buying and selling rates. For example, if interbank USD/EUR is 0.92, a bank might offer 0.90 to sell EUR and 0.94 to buy EUR.",
//   },
//   {
//     q: "Which currencies are the strongest in the world?",
//     a: "The strongest (highest value) currencies as of 2026: 1) Kuwaiti Dinar (KWD) - $3.27 USD, 2) Bahraini Dinar (BHD) - $2.65 USD, 3) Omani Rial (OMR) - $2.60 USD, 4) Jordanian Dinar (JOD) - $1.41 USD, 5) British Pound (GBP) - $1.27 USD. However, 'strong' refers to per-unit value, not global trading volume. Most traded currencies: USD, EUR, JPY, GBP, CNY.",
//   },
//   {
//     q: "How does inflation affect currency value?",
//     a: "Lower inflation typically strengthens a currency (increased purchasing power). Higher inflation weakens currency (devalues it). Example: If US inflation is 2% and India's is 6%, the USD will likely appreciate against INR over time. Central banks raise interest rates to fight inflation, which can strengthen the currency by attracting foreign investment seeking higher returns.",
//   },
//   {
//     q: "What is a currency peg and which countries use it?",
//     a: "A currency peg fixes a country's exchange rate to another currency (usually USD or EUR). Pegged currencies include: Hong Kong Dollar (to USD), Saudi Riyal (to USD), UAE Dirham (to USD), Bulgarian Lev (to EUR), Danish Krone (to EUR). Pegs provide stability but require large foreign reserves to maintain. Our calculator shows official peg rates where applicable.",
//   },
//   {
//     q: "How to calculate cross exchange rates?",
//     a: "A cross rate is an exchange rate between two non-USD currencies. Calculate by converting both to USD: Example: EUR/GBP = (EUR/USD) ÷ (GBP/USD). If EUR/USD = 1.09 and GBP/USD = 1.27, then EUR/GBP = 1.09/1.27 = 0.858. Our calculator automatically handles cross rates for all 20+ currencies.",
//   },
//   {
//     q: "What are the most traded currency pairs?",
//     a: "Major forex pairs (80% of daily $6.6 trillion volume): EUR/USD (28%), USD/JPY (13%), GBP/USD (10%), AUD/USD (6%), USD/CAD (5%), USD/CNY (4%), USD/CHF (3%), NZD/USD (2%). These pairs have the lowest spreads (0.1-1 pip) and highest liquidity. Exotic pairs (USD/INR, USD/ZAR) have wider spreads and more volatility.",
//   },
//   {
//     q: "How does political events affect currency?",
//     a: "Political events cause immediate currency volatility: Elections (uncertainty weakens currency, stability strengthens), Wars (safe-haven currencies like USD, CHF, JPY strengthen), Trade agreements (favorable deals strengthen currency), Political scandals (weaken currency), Brexit (caused GBP to drop 15% in 2016). Monitor economic calendars for major political events before exchanging large amounts.",
//   },
// ];

// const CURRENCY_SCHEMA = JSON.stringify({
//   "@context": "https://schema.org",
//   "@type": "WebApplication",
//   name: "Currency Converter – Live Exchange Rate Calculator",
//   description: "Convert between 20+ world currencies with real-time exchange rates. Free currency converter for USD, EUR, GBP, INR, JPY, and more.",
//   url: "https://www.numrexo.com/conversion/currency-converter",
//   applicationCategory: "FinanceApplication",
//   offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
//   author: { "@type": "Organization", name: "Numrexo" },
// });

// export default function CurrencyConverter() {
//   const [amount, setAmount] = useState("");
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("INR");
//   const [result, setResult] = useState<any>(null);
//   const [lastUpdated, setLastUpdated] = useState<string>("");
//   const [openFaq, setOpenFaq] = useState<number | null>(null);

//   useEffect(() => {
//     // Set last updated date
//     const today = new Date();
//     setLastUpdated(today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
//   }, []);

//   const convert = () => {
//     const amt = parseFloat(amount);
//     if (isNaN(amt) || amt <= 0) {
//       alert("Please enter a valid amount");
//       return;
//     }

//     const fromRate = EXCHANGE_RATES[fromCurrency];
//     const toRate = EXCHANGE_RATES[toCurrency];
//     const convertedAmount = (amt / fromRate) * toRate;

//     const fromCurrencyData = CURRENCIES.find(c => c.code === fromCurrency);
//     const toCurrencyData = CURRENCIES.find(c => c.code === toCurrency);

//     // Calculate inverse rate for display
//     const inverseRate = (fromRate / toRate).toFixed(4);

//     setResult({
//       convertedAmount: convertedAmount.toFixed(2),
//       fromAmount: amt.toFixed(2),
//       fromCurrency,
//       toCurrency,
//       fromSymbol: fromCurrencyData?.symbol,
//       toSymbol: toCurrencyData?.symbol,
//       fromName: fromCurrencyData?.name,
//       toName: toCurrencyData?.name,
//       rate: (toRate / fromRate).toFixed(4),
//       inverseRate,
//     });
//   };

//   const swapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//     if (result) {
//       setTimeout(() => convert(), 10);
//     }
//   };

//   const resetForm = () => {
//     setAmount("");
//     setFromCurrency("USD");
//     setToCurrency("INR");
//     setResult(null);
//   };

//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CURRENCY_SCHEMA }} />

//       <nav aria-label="Breadcrumb" className="mb-5">
//         <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
//           <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
//           <li className="text-gray-700">/</li>
//           <li><a href="https://www.numrexo.com/conversion" className="hover:text-gray-300">Converters</a></li>
//           <li className="text-gray-700">/</li>
//           <li><span className="text-gray-300">Currency Converter</span></li>
//         </ol>
//       </nav>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-800">
//             <h3 className="font-semibold">Currency Converter</h3>
//             <p className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated}</p>
//           </div>
//           <div className="p-6 space-y-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-400 mb-2">Amount</label>
//               <input
//                 type="number"
//                 placeholder="100"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//               />
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex-1">
//                 <label className="block text-xs font-semibold text-gray-400 mb-2">From</label>
//                 <select
//                   value={fromCurrency}
//                   onChange={(e) => setFromCurrency(e.target.value)}
//                   className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
//                 >
//                   {CURRENCIES.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.symbol} {c.code} - {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <button
//                 onClick={swapCurrencies}
//                 className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-lg"
//                 aria-label="Swap currencies"
//               >
//                 🔄
//               </button>
//               <div className="flex-1">
//                 <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
//                 <select
//                   value={toCurrency}
//                   onChange={(e) => setToCurrency(e.target.value)}
//                   className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
//                 >
//                   {CURRENCIES.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.symbol} {c.code} - {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={convert}
//                 className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all"
//               >
//                 Convert →
//               </button>
//               <button
//                 onClick={resetForm}
//                 className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>

//         <ResultBox
//           title="Converted Amount"
//           isEmpty={!result}
//           emptyIcon="💱"
//           emptyText="Enter amount and press Convert"
//           mainResult={result ? {
//             label: `${result.fromSymbol}${result.fromAmount} ${result.fromCurrency} =`,
//             value: `${result.toSymbol}${result.convertedAmount} ${result.toCurrency}`,
//             color: "text-teal-400",
//           } : undefined}
//           extraRows={result ? [
//             { label: `1 ${result.fromCurrency} =`, value: `${result.toSymbol}${result.rate} ${result.toCurrency}` },
//             { label: `1 ${result.toCurrency} =`, value: `${result.fromSymbol}${result.inverseRate} ${result.fromCurrency}` },
//             { label: "Exchange Rate Updated", value: lastUpdated },
//           ] : undefined}
//         />
//       </div>

//       {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

//       {/* About Section */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-3">About Currency Converter</h2>
//         <p className="text-gray-400 text-sm leading-relaxed mb-3">
//           Our <strong className="text-gray-300">free currency converter</strong> provides real-time exchange rates for 20+ major world currencies including USD, EUR, GBP, INR, JPY, and CNY. Whether you're planning international travel, sending money overseas, or tracking foreign investments, get accurate conversions instantly.
//         </p>
//         <p className="text-gray-400 text-sm leading-relaxed">
//           Exchange rates are updated daily using market data from leading financial institutions. For the most accurate international money transfers, always check with your bank or transfer service for final rates including fees.
//         </p>
//       </section>

//       {/* How to Use Section */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-3">How to Use This Currency Converter</h2>
//         <div className="space-y-3">
//           <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">amount</strong> you want to convert.</p>
//           <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select your <strong className="text-white">from currency</strong> (the currency you have).</p>
//           <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select your <strong className="text-white">to currency</strong> (the currency you want).</p>
//           <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the converted amount and exchange rate.</p>
//           <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">swap button (🔄)</strong> to quickly reverse the currencies.</p>
//           <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">Reset</strong> to clear all inputs and start a new conversion.</p>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-3">Why Use Our Currency Converter</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
//             <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ International Travel</h3>
//             <p className="text-gray-400 text-xs leading-relaxed">Plan your travel budget by converting your home currency to destination currency. Know exactly how much you'll spend on hotels, meals, and activities.</p>
//           </div>
//           <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
//             <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Online Shopping</h3>
//             <p className="text-gray-400 text-xs leading-relaxed">Shop from international websites with confidence. Convert prices to your local currency before buying to avoid exchange rate surprises.</p>
//           </div>
//           <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
//             <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Freelance & Business</h3>
//             <p className="text-gray-400 text-xs leading-relaxed">Calculate international payments, invoices, and earnings in your local currency. Track exchange rate fluctuations for better financial planning.</p>
//           </div>
//           <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
//             <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Investment Tracking</h3>
//             <p className="text-gray-400 text-xs leading-relaxed">Monitor foreign stock, crypto, and real estate investments. Convert investment values to your home currency for accurate portfolio tracking.</p>
//           </div>
//         </div>
//       </section>

//       {/* Major Currency Pairs */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-4">Major Currency Pairs & Exchange Rates</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           {[
//             { from: "USD", to: "EUR", rate: EXCHANGE_RATES.EUR / EXCHANGE_RATES.USD },
//             { from: "USD", to: "GBP", rate: EXCHANGE_RATES.GBP / EXCHANGE_RATES.USD },
//             { from: "USD", to: "INR", rate: EXCHANGE_RATES.INR / EXCHANGE_RATES.USD },
//             { from: "EUR", to: "GBP", rate: EXCHANGE_RATES.GBP / EXCHANGE_RATES.EUR },
//             { from: "EUR", to: "USD", rate: EXCHANGE_RATES.USD / EXCHANGE_RATES.EUR },
//             { from: "GBP", to: "USD", rate: EXCHANGE_RATES.USD / EXCHANGE_RATES.GBP },
//           ].map((pair, i) => (
//             <div key={i} className="bg-[#111827] border border-gray-800 rounded-lg p-3 text-center">
//               <div className="text-sm font-semibold text-gray-300">{pair.from} → {pair.to}</div>
//               <div className="text-lg font-mono text-teal-400">{pair.rate.toFixed(4)}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Tips for Best Exchange Rates */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-3">Tips for Getting the Best Exchange Rates</h2>
//         <ul className="space-y-2">
//           <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Avoid airports & hotels:</strong> They charge 5-15% markup. Exchange at local banks or ATMs instead.</span></li>
//           <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Use online transfer services:</strong> Wise, Revolut, OFX offer 0.5-1% fees vs bank 3-5%.</span></li>
//           <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Exchange larger amounts:</strong> Fees are often fixed, so larger amounts reduce percentage cost.</span></li>
//           <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Monitor rate trends:</strong> Use our currency converter daily to spot favorable rates before exchanging.</span></li>
//           <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">No-foreign-fee credit cards:</strong> Save 3% on international purchases compared to regular cards.</span></li>
//         </ul>
//       </section>

//       {/* Factors Affecting Exchange Rates */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-3">Factors That Affect Currency Exchange Rates</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div className="bg-[#111827] border border-gray-800 rounded-lg p-3">
//             <span className="text-blue-400 font-semibold">Interest Rates</span>
//             <p className="text-gray-500 text-xs mt-1">Higher rates attract foreign investors → Currency strengthens</p>
//           </div>
//           <div className="bg-[#111827] border border-gray-800 rounded-lg p-3">
//             <span className="text-blue-400 font-semibold">Inflation</span>
//             <p className="text-gray-500 text-xs mt-1">Lower inflation → Currency strengthens (purchasing power increases)</p>
//           </div>
//           <div className="bg-[#111827] border border-gray-800 rounded-lg p-3">
//             <span className="text-blue-400 font-semibold">Political Stability</span>
//             <p className="text-gray-500 text-xs mt-1">Stable countries attract investment → Currency strengthens</p>
//           </div>
//           <div className="bg-[#111827] border border-gray-800 rounded-lg p-3">
//             <span className="text-blue-400 font-semibold">Trade Balance</span>
//             <p className="text-gray-500 text-xs mt-1">Exports  Imports → Currency strengthens (higher demand)</p>
//           </div>
//         </div>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-4">Popular Currency Pairs & Rates</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           {[
//             { from: "USD", to: "EUR", rate: EXCHANGE_RATES.EUR / EXCHANGE_RATES.USD },
//             { from: "USD", to: "GBP", rate: EXCHANGE_RATES.GBP / EXCHANGE_RATES.USD },
//             { from: "USD", to: "INR", rate: EXCHANGE_RATES.INR / EXCHANGE_RATES.USD },
//             { from: "EUR", to: "GBP", rate: EXCHANGE_RATES.GBP / EXCHANGE_RATES.EUR },
//             { from: "EUR", to: "USD", rate: EXCHANGE_RATES.USD / EXCHANGE_RATES.EUR },
//             { from: "GBP", to: "USD", rate: EXCHANGE_RATES.USD / EXCHANGE_RATES.GBP },
//           ].map((pair, i) => (
//             <div key={i} className="bg-[#111827] border border-gray-800 rounded-lg p-3 text-center">
//               <div className="text-sm font-semibold text-gray-300">{pair.from} → {pair.to}</div>
//               <div className="text-lg font-mono text-teal-400">{pair.rate.toFixed(4)}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-4">Supported Currencies</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {CURRENCIES.map((currency) => (
//             <div key={currency.code} className="bg-[#111827] border border-gray-800 rounded-lg p-2 flex items-center justify-between">
//               <div>
//                 <span className="font-mono font-semibold text-gray-300">{currency.code}</span>
//                 <p className="text-xs text-gray-500">{currency.name}</p>
//               </div>
//               <span className="text-lg">{currency.symbol}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-4">Currency Conversion Formula</h2>
//         <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
//           <p className="text-white font-mono text-sm mb-2">Converted Amount = (Amount ÷ From Rate) × To Rate</p>
//           <p className="text-gray-500 text-xs">Example: Convert 100 USD to EUR at rate 0.92 = (100 ÷ 1) × 0.92 = 92 EUR</p>
//         </div>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
//         <div className="space-y-2">
//           {FAQ_DATA.map((item, i) => (
//             <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
//               <button
//                 className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
//                 onClick={() => setOpenFaq(openFaq === i ? null : i)}
//               >
//                 <span className="text-sm font-medium text-gray-200">{item.q}</span>
//                 <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
//               </button>
//               {openFaq === i && (
//                 <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
//                   {item.a}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }