"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  {
    q: "What is GST and how does it work in India?",
    a: "GST (Goods and Services Tax) is a comprehensive, multi-stage, destination-based tax on every value addition. Implemented on July 1, 2017, it replaced 17+ indirect taxes (VAT, Service Tax, Excise, etc.). GST has 4 main slabs: 5%, 12%, 18%, 28%. Essential goods are taxed at 0-5%, luxury at 28% + cess. GST is collected as CGST (Central) + SGST (State) for intra-state, or IGST (Integrated) for inter-state sales.",
  },
  {
    q: "What are the GST rates for different products?",
    a: "0% (Exempt): Fresh milk, eggs, vegetables, bread, salt, books, healthcare, education. 5%: Packed food, tea, coffee, edible oil, sugar, medicine, railway tickets. 12%: Processed food, butter, ghee, dry fruits, cell phones, Ayurvedic medicines. 18%: Most products - soaps, hair oil, toothpaste, AC, fridge, washing machine, computers, restaurant bills, telecom, financial services. 28%: Luxury - cars (plus 1-22% cess), tobacco, aerated drinks, high-end motorcycles.",
  },
  {
    q: "What is the difference between CGST, SGST, and IGST?",
    a: "Intra-state sale (within same state): CGST (Central GST) + SGST (State GST) - both equally split the total GST rate. Example: 18% GST in Maharashtra = 9% CGST + 9% SGST. Inter-state sale (between states): IGST (Integrated GST) - collected by central government. Example: Maharashtra to Gujarat at 18% = 18% IGST. Export: Zero-rated (0% GST), can claim refund. Import: IGST applicable on goods/services.",
  },
  {
    q: "How to calculate GST from total amount?",
    a: "To remove GST from inclusive price: Original Price = Total ÷ (1 + GST Rate/100). Example: ₹11,800 inclusive at 18% GST = ₹11,800 ÷ 1.18 = ₹10,000 original price. GST amount = ₹1,800. Use our Remove GST mode for easy calculation. This is useful for claiming input tax credit or when GST is included in quoted price.",
  },
  {
    q: "What is input tax credit (ITC) in GST?",
    a: "Input Tax Credit allows businesses to deduct the GST paid on purchases from the GST collected on sales. Example: Buy raw material paying ₹1,800 GST (18% on ₹10,000). Sell finished product collecting ₹3,600 GST (18% on ₹20,000). Net GST payable = ₹3,600 - ₹1,800 = ₹1,800. ITC prevents cascading tax effect. However, blocked credits exist for motor vehicles, food, beauty treatments (unless specific business).",
  },
  {
    q: "Who needs to register for GST?",
    a: "GST registration mandatory if: 1) Aggregate turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services) - ₹10 lakhs for special category states. 2) Interstate supplier. 3) E-commerce operator. 4) Casual taxable person. 5) Input service distributor. Voluntary registration allowed (benefits: ITC claim, legal recognition). Penalty for non-registration: 100% of tax due or ₹10,000 minimum.",
  },
  {
    q: "What is the GST composition scheme?",
    a: "Composition Scheme for small taxpayers (turnover < ₹1.5 crore): Pay tax at lower rates (1% for manufacturers, 5% for restaurants, 6% for other services). Benefits: Less compliance (quarterly returns), lower tax burden. Limitations: Cannot claim ITC, cannot collect tax from customers, cannot make inter-state sales, cannot sell through e-commerce. Better for B2C businesses with low profit margins.",
  },
  {
    q: "What are GST return filing due dates?",
    a: "GSTR-1 (Outward supplies): Monthly by 11th, Quarterly by 13th of next month. GSTR-3B (Summary return): Monthly by 20th. GSTR-9 (Annual): December 31st. Composition: CMP-08 quarterly by 18th of next month. Late fees: ₹50/day (₹20 for Nil returns), maximum ₹10,000 per return. Interest on late payment: 18% per annum. Use our calculator to compute accurate GST for your returns.",
  },
  {
    q: "How is GST on restaurant and hotel bills calculated?",
    a: "Restaurants (non-AC): 5% GST (no ITC) on food bills, 18% on alcohol. Restaurants (AC/with license): 18% GST. Hotels: Room rent < ₹1,000 - No GST, ₹1,000-7,500 - 12% GST, > ₹7,500 - 18% GST. 5-star hotels: 28% GST on room rent + 18% on F&B. Takeaway/delivery (Zomato/Swiggy): 5% GST if restaurant registered, 18% if platform collects. Our calculator supports all hotel/restaurant GST scenarios.",
  },
  {
    q: "What is the GST on e-commerce and digital services?",
    a: "Digital services from foreign providers (Netflix, Spotify, Google Ads) attract 18% IGST under OIDAR (Online Information Database Access and Retrieval). Amazon/Flipkart sales: Seller pays GST, platform collects TCS (Tax Collected at Source) at 1% under Section 52. UPI payments: No GST on transaction value (banks pay 18% on service fees). Crypto trading: 1% TDS + 18% GST on exchange fees.",
  },
];

const GST_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GST Calculator – Goods and Services Tax Calculator",
  description: "Calculate GST for any amount. Add or remove GST, split into CGST/SGST/IGST. Supports all Indian GST slabs (0%, 3%, 5%, 12%, 18%, 28%).",
  url: "https://www.numrexo.com/tax/gst-calculator",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Numrexo" },
});

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [calcType, setCalcType] = useState<"exclusive" | "inclusive">("exclusive");
  const [transactionType, setTransactionType] = useState<"intrastate" | "interstate">("intrastate");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(gstRate) / 100;
    if (!a || isNaN(a) || a <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    let pre: number, gst: number, post: number;
    if (calcType === "exclusive") {
      pre = a;
      gst = a * r;
      post = a + gst;
    } else {
      post = a;
      pre = a / (1 + r);
      gst = post - pre;
    }

    const cgst = gst / 2;
    const sgst = gst / 2;
    const igst = transactionType === "interstate" ? gst : 0;

    setResult({
      pre: pre.toFixed(2),
      gst: gst.toFixed(2),
      post: post.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      igst: igst.toFixed(2),
      gstRate,
      calcType,
      transactionType,
    });
  };

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(parseFloat(num));
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GST_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/tax" className="hover:text-gray-300">Tax Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">GST Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">GST Calculation</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Amount</label>
              <div className="relative">
                <input type="number" placeholder="10000" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">GST Rate</label>
              <select value={gstRate} onChange={(e) => setGstRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">
                <option value="0">0% – Exempted (Essential goods)</option>
                <option value="3">3% – Gold, Silver, Precious metals</option>
                <option value="5">5% – Essential goods (edible oil, sugar)</option>
                <option value="12">12% – Processed food, phones, Ayurveda</option>
                <option value="18">18% – Most services & products (IT, banking)</option>
                <option value="28">28% – Luxury goods (cars, AC, tobacco)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "exclusive" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("exclusive")}>Add GST</button>
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "inclusive" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("inclusive")}>Remove GST</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Transaction Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${transactionType === "intrastate" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setTransactionType("intrastate")}>Intra-State (CGST+SGST)</button>
                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${transactionType === "interstate" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setTransactionType("interstate")}>Inter-State (IGST)</button>
              </div>
            </div>
            <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate GST →</button>
          </div>
        </div>

        <ResultBox
          title="GST Breakdown"
          isEmpty={!result}
          emptyIcon="🧾"
          emptyText="Enter amount to calculate GST"
          mainResult={result ? { label: calcType === "exclusive" ? "Total Amount (with GST)" : "Original Amount (without GST)", value: `₹${formatNumber(calcType === "exclusive" ? result.post : result.pre)}`, color: "text-green-400" } : undefined}
          extraRows={result ? [
            { label: "Pre-GST Amount", value: `₹${formatNumber(result.pre)}` },
            { label: `Total GST (${result.gstRate}%)`, value: `₹${formatNumber(result.gst)}`, valueColor: "text-green-400" },
            ...(transactionType === "intrastate" ? [
              { label: `CGST (${parseFloat(result.gstRate) / 2}%)`, value: `₹${formatNumber(result.cgst)}` },
              { label: `SGST (${parseFloat(result.gstRate) / 2}%)`, value: `₹${formatNumber(result.sgst)}` },
            ] : [
              { label: `IGST (${result.gstRate}%)`, value: `₹${formatNumber(result.igst)}` },
            ]),
            { label: "Final Amount", value: `₹${formatNumber(result.post)}`, valueColor: "text-green-400" },
          ] : undefined}
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About GST Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our <strong className="text-gray-300">GST calculator</strong> helps you compute Goods and Services Tax for all Indian GST slabs (0%, 3%, 5%, 12%, 18%, 28%). Perfect for businesses, accountants, and consumers to calculate tax on purchases, sales, and invoices.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          The calculator supports both Add GST (calculate tax on original price) and Remove GST (extract original price from GST-inclusive amount), plus intra-state (CGST+SGST) and inter-state (IGST) transactions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">GST Formula</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Add GST</h3>
            <p className="text-white font-mono text-xs">GST Amount = Original Price × (GST Rate ÷ 100)</p>
            <p className="text-white font-mono text-xs mt-1">Total Price = Original Price + GST Amount</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Remove GST</h3>
            <p className="text-white font-mono text-xs">Original Price = Total Price ÷ (1 + GST Rate ÷ 100)</p>
            <p className="text-white font-mono text-xs mt-1">GST Amount = Total Price - Original Price</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">GST Rate Slabs by Category</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">GST Rate</th><th className="text-left py-3 px-4 text-gray-400">Product / Service Category</th></tr></thead>
            <tbody>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4 font-semibold text-green-400">0%</td><td className="py-2 px-4 text-gray-300">Fresh milk, eggs, vegetables, bread, salt, books, healthcare, education</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4 font-semibold text-yellow-400">3%</td><td className="py-2 px-4 text-gray-300">Gold, silver, precious metals, jewellery</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4 font-semibold text-yellow-400">5%</td><td className="py-2 px-4 text-gray-300">Packed food, tea, coffee, edible oil, sugar, medicine, railway tickets</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4 font-semibold text-orange-400">12%</td><td className="py-2 px-4 text-gray-300">Processed food, butter, ghee, dry fruits, cell phones, Ayurvedic medicines</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4 font-semibold text-orange-400">18%</td><td className="py-2 px-4 text-gray-300">Soaps, hair oil, toothpaste, AC, fridge, washing machine, computers, restaurant bills, telecom, financial services</td></tr>
              <tr><td className="py-2 px-4 font-semibold text-red-400">28%</td><td className="py-2 px-4 text-gray-300">Cars (+1-22% cess), tobacco, aerated drinks, high-end motorcycles, luxury goods</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}