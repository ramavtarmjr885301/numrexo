// "use client";

// import { useState, useRef } from "react";
// import ResultBox from "@/components/common/ResultBox";

// const FAQ_DATA = [
//     {
//         q: "What information should be on an invoice?",
//         a: "Invoice number, date, your business name and address, client name and address, description of items/services, quantity, rate, subtotal, taxes, total amount, and payment terms.",
//     },
//     {
//         q: "Is this invoice legally valid?",
//         a: "This generates a professional invoice template. For legal validity, ensure you include GST/VAT numbers (if applicable), proper invoice numbering, and your business registration details.",
//     },
//     {
//         q: "What are common payment terms?",
//         a: "Net 15 (due in 15 days), Net 30 (due in 30 days), Due on Receipt, COD (Cash on Delivery), or specify a custom due date. Always include late payment penalty information.",
//     },
//     {
//         q: "Do I need to charge GST on my invoice?",
//         a: "If your annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states), you need GST registration and must charge GST on your invoices.",
//     },
// ];

// interface InvoiceItem {
//     id: number;
//     description: string;
//     quantity: string;
//     rate: string;
// }

// export default function InvoiceGenerator() {
//     // Business Details
//     const [businessName, setBusinessName] = useState("");
//     const [businessAddress, setBusinessAddress] = useState("");
//     const [businessEmail, setBusinessEmail] = useState("");
//     const [businessPhone, setBusinessPhone] = useState("");
//     const [gstNumber, setGstNumber] = useState("");

//     // Client Details
//     const [clientName, setClientName] = useState("");
//     const [clientAddress, setClientAddress] = useState("");
//     const [clientEmail, setClientEmail] = useState("");
//     const [clientPhone, setClientPhone] = useState("");

//     // Invoice Details
//     const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-8)}`);
//     const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
//     const [dueDate, setDueDate] = useState("");
//     const [paymentTerms, setPaymentTerms] = useState("Net 30");

//     // Items
//     const [items, setItems] = useState<InvoiceItem[]>([
//         { id: 1, description: "", quantity: "1", rate: "" },
//     ]);

//     // Tax & Discount
//     const [taxRate, setTaxRate] = useState("18");
//     const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
//     const [discountValue, setDiscountValue] = useState("");
//     const [notes, setNotes] = useState("");

//     const [result, setResult] = useState<any>(null);
//     const [openFaq, setOpenFaq] = useState<number | null>(null);
//     const printRef = useRef<HTMLDivElement>(null);

//     const addItem = () => {
//         const newId = Math.max(...items.map(i => i.id), 0) + 1;
//         setItems([...items, { id: newId, description: "", quantity: "1", rate: "" }]);
//     };

//     const removeItem = (id: number) => {
//         if (items.length > 1) {
//             setItems(items.filter(i => i.id !== id));
//         }
//     };

//     const updateItem = (id: number, field: keyof InvoiceItem, value: string) => {
//         setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
//     };

//     const calculateSubtotal = (): number => {
//         let subtotal = 0;
//         for (const item of items) {
//             const quantity = parseFloat(item.quantity) || 0;
//             const rate = parseFloat(item.rate) || 0;
//             subtotal += quantity * rate;
//         }
//         return subtotal;
//     };

//     const calculateDiscount = (subtotal: number): number => {
//         const discount = parseFloat(discountValue) || 0;
//         if (discountType === "percentage") {
//             return (subtotal * discount) / 100;
//         }
//         return discount;
//     };

//     const calculateTax = (subtotal: number, discount: number): number => {
//         const tax = parseFloat(taxRate) || 0;
//         const taxableAmount = subtotal - discount;
//         return (taxableAmount * tax) / 100;
//     };

//     const calculateTotal = (): number => {
//         const subtotal = calculateSubtotal();
//         const discount = calculateDiscount(subtotal);
//         const tax = calculateTax(subtotal, discount);
//         return subtotal - discount + tax;
//     };

//     const generateInvoice = () => {
//         if (!businessName || !clientName) {
//             alert("Please enter at least Business Name and Client Name");
//             return;
//         }

//         const subtotal = calculateSubtotal();
//         const discount = calculateDiscount(subtotal);
//         const tax = calculateTax(subtotal, discount);
//         const total = calculateTotal();

//         const validItems = items.filter(i => i.description && parseFloat(i.rate) > 0);

//         if (validItems.length === 0) {
//             alert("Please add at least one item with description and rate");
//             return;
//         }

//         setResult({
//             businessName: businessName || "Your Business Name",
//             businessAddress: businessAddress || "",
//             businessEmail: businessEmail || "",
//             businessPhone: businessPhone || "",
//             gstNumber: gstNumber || "",
//             clientName: clientName,
//             clientAddress: clientAddress || "",
//             clientEmail: clientEmail || "",
//             clientPhone: clientPhone || "",
//             invoiceNumber: invoiceNumber,
//             invoiceDate: invoiceDate,
//             dueDate: dueDate || new Date(new Date(invoiceDate).setDate(new Date(invoiceDate).getDate() + 30)).toISOString().split('T')[0],
//             paymentTerms: paymentTerms,
//             items: validItems.map(i => ({
//                 description: i.description,
//                 quantity: parseFloat(i.quantity) || 1,
//                 rate: parseFloat(i.rate) || 0,
//                 amount: ((parseFloat(i.quantity) || 1) * (parseFloat(i.rate) || 0)).toFixed(2),
//             })),
//             subtotal: subtotal.toFixed(2),
//             discountType: discountType,
//             discountValue: discountValue || "0",
//             discountAmount: discount.toFixed(2),
//             taxRate: taxRate,
//             taxAmount: tax.toFixed(2),
//             total: total.toFixed(2),
//             notes: notes || "Thank you for your business!",
//         });
//     };

//     const handlePrint = () => {
//         const printContent = printRef.current;
//         if (!printContent) return;

//         const originalContents = document.body.innerHTML;
//         const printWindow = window.open('', '_blank');

//         if (printWindow) {
//             printWindow.document.write(`
//                 <html>
//                     <head>
//                         <title>Invoice ${invoiceNumber}</title>
//                         <style>
//                             body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
//                             .invoice-container { max-width: 800px; margin: 0 auto; }
//                             .header { text-align: center; margin-bottom: 30px; }
//                             .section { margin-bottom: 20px; }
//                             .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
//                             table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//                             th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
//                             th { background-color: #f2f2f2; }
//                             .total-row { font-weight: bold; }
//                             @media print {
//                                 button { display: none; }
//                             }
//                         </style>
//                     </head>
//                     <body>
//                         <div class="invoice-container">
//                             ${printContent.innerHTML}
//                         </div>
//                         <script>window.print(); window.close();<\/script>
//                     </body>
//                 </html>
//             `);
//             printWindow.document.close();
//         }
//     };

//     const reset = () => {
//         setBusinessName("");
//         setBusinessAddress("");
//         setBusinessEmail("");
//         setBusinessPhone("");
//         setGstNumber("");
//         setClientName("");
//         setClientAddress("");
//         setClientEmail("");
//         setClientPhone("");
//         setInvoiceNumber(`INV-${Date.now().toString().slice(-8)}`);
//         setInvoiceDate(new Date().toISOString().split('T')[0]);
//         setDueDate("");
//         setPaymentTerms("Net 30");
//         setItems([{ id: 1, description: "", quantity: "1", rate: "" }]);
//         setTaxRate("18");
//         setDiscountType("percentage");
//         setDiscountValue("");
//         setNotes("");
//         setResult(null);
//     };

//     return (
//         <>
//             <nav aria-label="Breadcrumb" className="mb-5">
//                 <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
//                     <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
//                     <li className="text-gray-700">/</li>
//                     <li><a href="https://www.numrexo.com/business" className="hover:text-gray-300">Business Tools</a></li>
//                     <li className="text-gray-700">/</li>
//                     <li><span className="text-gray-300">Invoice Generator</span></li>
//                 </ol>
//             </nav>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
//                     <div className="px-6 py-4 border-b border-gray-800">
//                         <h3 className="font-semibold">Invoice Details</h3>
//                         <p className="text-xs text-gray-500">Fill in your business and invoice information</p>
//                     </div>
//                     <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
//                         {/* Business Details */}
//                         <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
//                             <h4 className="text-sm font-semibold text-teal-400 mb-2">🏢 Business Details</h4>
//                             <div className="space-y-2">
//                                 <input type="text" placeholder="Business Name *" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <input type="text" placeholder="Business Address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <div className="flex gap-2">
//                                     <input type="email" placeholder="Email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                     <input type="tel" placeholder="Phone" value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 </div>
//                                 <input type="text" placeholder="GST/VAT Number (if applicable)" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                             </div>
//                         </div>

//                         {/* Client Details */}
//                         <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
//                             <h4 className="text-sm font-semibold text-blue-400 mb-2">👤 Client Details</h4>
//                             <div className="space-y-2">
//                                 <input type="text" placeholder="Client Name *" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <input type="text" placeholder="Client Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <div className="flex gap-2">
//                                     <input type="email" placeholder="Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                     <input type="tel" placeholder="Phone" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Invoice Details */}
//                         <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
//                             <h4 className="text-sm font-semibold text-yellow-400 mb-2">📄 Invoice Details</h4>
//                             <div className="grid grid-cols-2 gap-2">
//                                 <input type="text" placeholder="Invoice #" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <input type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm">
//                                     <option value="Due on Receipt">Due on Receipt</option>
//                                     <option value="Net 15">Net 15</option>
//                                     <option value="Net 30">Net 30</option>
//                                     <option value="Net 45">Net 45</option>
//                                     <option value="Net 60">Net 60</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Items */}
//                         <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
//                             <div className="flex justify-between items-center mb-2">
//                                 <h4 className="text-sm font-semibold text-green-400">📦 Items/Services</h4>
//                                 <button onClick={addItem} className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30">+ Add Item</button>
//                             </div>
//                             <div className="space-y-2 max-h-48 overflow-y-auto">
//                                 {items.map((item, idx) => (
//                                     <div key={item.id} className="flex gap-2 items-center">
//                                         <div className="w-6 text-xs text-gray-500">{idx + 1}</div>
//                                         <input type="text" placeholder="Description" value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} className="flex-2 px-2 py-1.5 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-xs" />
//                                         <input type="number" step="1" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value)} className="w-16 px-2 py-1.5 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-xs" />
//                                         <input type="number" step="100" placeholder="Rate" value={item.rate} onChange={(e) => updateItem(item.id, "rate", e.target.value)} className="w-24 px-2 py-1.5 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-xs" />
//                                         {items.length > 1 && <button onClick={() => removeItem(item.id)} className="px-2 text-red-400">✕</button>}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Tax & Discount */}
//                         <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
//                             <h4 className="text-sm font-semibold text-orange-400 mb-2">💰 Tax & Discount</h4>
//                             <div className="grid grid-cols-2 gap-2">
//                                 <div>
//                                     <label className="text-xs text-gray-500">Tax Rate (%)</label>
//                                     <input type="number" step="1" placeholder="18" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 </div>
//                                 <div>
//                                     <label className="text-xs text-gray-500">Discount Type</label>
//                                     <select value={discountType} onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm">
//                                         <option value="percentage">Percentage (%)</option>
//                                         <option value="fixed">Fixed Amount (₹)</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-span-2">
//                                     <label className="text-xs text-gray-500">Discount Value</label>
//                                     <input type="number" step="100" placeholder="0" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Notes */}
//                         <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
//                             <h4 className="text-sm font-semibold text-purple-400 mb-2">📝 Notes</h4>
//                             <textarea rows={2} placeholder="Payment instructions, thank you message, etc." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm resize-none"></textarea>
//                         </div>

//                         <div className="flex gap-3">
//                             <button onClick={generateInvoice} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Generate Invoice →</button>
//                             <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
//                         </div>
//                     </div>
//                 </div>

//                 <ResultBox
//                     title="Invoice Preview"
//                     isEmpty={!result}
//                     emptyIcon="📄"
//                     emptyText="Fill details and generate invoice"
//                     mainResult={result ? { label: "Total Amount", value: `₹${parseFloat(result.total).toLocaleString()}`, color: "text-teal-400" } : undefined}
//                     extraRows={result ? [
//                         { label: "Invoice #", value: result.invoiceNumber },
//                         { label: "Client", value: result.clientName },
//                         { label: "Subtotal", value: `₹${parseFloat(result.subtotal).toLocaleString()}` },
//                         ...(parseFloat(result.discountAmount) > 0 ? [{ label: `Discount (${result.discountType === "percentage" ? `${result.discountValue}%` : `₹${result.discountValue}`})`, value: `-₹${parseFloat(result.discountAmount).toLocaleString()}`, valueColor: "text-green-400" }] : []),
//                         { label: `Tax (${result.taxRate}%)`, value: `₹${parseFloat(result.taxAmount).toLocaleString()}` },
//                         { label: "Due Date", value: result.dueDate, valueColor: "text-yellow-400" },
//                     ] : []}
//                 />
//             </div>

//             {/* Printable Invoice */}
//             {result && (
//                 <div className="mb-8">
//                     <div className="flex justify-end mb-3 gap-3">
//                         <button onClick={handlePrint} className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">🖨️ Print / Download PDF</button>
//                     </div>

//                     <div ref={printRef} className="bg-white text-black rounded-xl p-8 shadow-lg">
//                         {/* Invoice Header */}
//                         <div className="text-center border-b pb-4 mb-4">
//                             <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
//                         </div>

//                         <div className="grid grid-cols-2 gap-8 mb-6">
//                             <div>
//                                 <h3 className="font-bold text-gray-700">From:</h3>
//                                 <p className="text-gray-600 text-sm">{result.businessName}</p>
//                                 <p className="text-gray-500 text-xs">{result.businessAddress}</p>
//                                 <p className="text-gray-500 text-xs">{result.businessEmail}</p>
//                                 <p className="text-gray-500 text-xs">{result.businessPhone}</p>
//                                 {result.gstNumber && <p className="text-gray-500 text-xs">GST: {result.gstNumber}</p>}
//                             </div>
//                             <div>
//                                 <h3 className="font-bold text-gray-700">To:</h3>
//                                 <p className="text-gray-600 text-sm">{result.clientName}</p>
//                                 <p className="text-gray-500 text-xs">{result.clientAddress}</p>
//                                 <p className="text-gray-500 text-xs">{result.clientEmail}</p>
//                                 <p className="text-gray-500 text-xs">{result.clientPhone}</p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
//                             <div><span className="font-bold">Invoice #:</span> {result.invoiceNumber}</div>
//                             <div><span className="font-bold">Date:</span> {result.invoiceDate}</div>
//                             <div><span className="font-bold">Due Date:</span> {result.dueDate}</div>
//                         </div>

//                         {/* Items Table */}
//                         <table className="w-full mb-6">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="text-left p-2 text-sm">Description</th>
//                                     <th className="text-right p-2 text-sm">Quantity</th>
//                                     <th className="text-right p-2 text-sm">Rate (₹)</th>
//                                     <th className="text-right p-2 text-sm">Amount (₹)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {result.items.map((item: any, idx: number) => (
//                                     <tr key={idx}>
//                                         <td className="p-2 text-sm">{item.description}</td>
//                                         <td className="text-right p-2 text-sm">{item.quantity}</td>
//                                         <td className="text-right p-2 text-sm">₹{parseFloat(item.rate).toLocaleString()}</td>
//                                         <td className="text-right p-2 text-sm">₹{parseFloat(item.amount).toLocaleString()}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {/* Totals */}
//                         <div className="flex justify-end">
//                             <div className="w-64">
//                                 <div className="flex justify-between py-1 text-sm"><span>Subtotal:</span><span>₹{parseFloat(result.subtotal).toLocaleString()}</span></div>
//                                 {parseFloat(result.discountAmount) > 0 && (
//                                     <div className="flex justify-between py-1 text-sm text-green-600"><span>Discount:</span><span>-₹{parseFloat(result.discountAmount).toLocaleString()}</span></div>
//                                 )}
//                                 <div className="flex justify-between py-1 text-sm"><span>Tax ({result.taxRate}%):</span><span>₹{parseFloat(result.taxAmount).toLocaleString()}</span></div>
//                                 <div className="flex justify-between py-2 text-lg font-bold border-t mt-1"><span>Total:</span><span>₹{parseFloat(result.total).toLocaleString()}</span></div>
//                             </div>
//                         </div>

//                         {/* Notes */}
//                         {result.notes && (
//                             <div className="mt-6 pt-4 border-t text-sm text-gray-600">
//                                 <p>{result.notes}</p>
//                             </div>
//                         )}

//                         <div className="mt-6 text-center text-xs text-gray-400">
//                             <p>Thank you for your business!</p>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <section className="mb-8">
//                 <h2 className="text-xl font-semibold text-white mb-3">About Invoice Generator</h2>
//                 <p className="text-gray-400 text-sm leading-relaxed">Create professional invoices for your business. Add items, apply discounts and taxes, and print or download as PDF. Perfect for freelancers, small businesses, and service providers.</p>
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
//                 <div className="space-y-2">
//                     {FAQ_DATA.map((item, i) => (
//                         <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
//                             <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
//                                 <span className="text-sm font-medium text-gray-200">{item.q}</span>
//                                 <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
//                             </button>
//                             {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </>
//     );
// }








"use client";

import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type GSTType = "cgst_sgst" | "igst" | "utgst" | "none";
type DiscountType = "percentage" | "fixed";
type SupplyType = "goods" | "services";

interface InvoiceItem {
    id: number;
    description: string;
    hsnSac: string;
    supplyType: SupplyType;
    quantity: string;
    unit: string;
    rate: string;
    gstRate: string;
}

interface ResultItem {
    description: string;
    hsnSac: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
    gstRate: number;
    gstAmount: number;
    cgst: number;
    sgst: number;
    igst: number;
    utgst: number;
    total: number;
}

interface InvoiceResult {
    sellerName: string;
    sellerAddress: string;
    sellerEmail: string;
    sellerPhone: string;
    sellerGstin: string;
    sellerPan: string;
    sellerState: string;
    buyerName: string;
    buyerAddress: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerGstin: string;
    buyerState: string;
    buyerStateCode: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    poNumber: string;
    paymentTerms: string;
    placeOfSupply: string;
    gstType: GSTType;
    reverseCharge: boolean;
    items: ResultItem[];
    subtotal: number;
    discountType: DiscountType;
    discountValue: number;
    discountAmount: number;
    taxableAmount: number;
    totalCgst: number;
    totalSgst: number;
    totalIgst: number;
    totalUtgst: number;
    roundOff: number;
    grandTotal: number;
    amountInWords: string;
    notes: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountName: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GST_RATES = ["0", "0.1", "0.25", "1", "1.5", "3", "5", "7.5", "12", "18", "28"];
const UNITS = ["Nos", "Pcs", "Kg", "Gram", "Ltr", "Mtr", "Sqft", "Sqmt", "Box", "Set", "Pair", "Hr", "Day", "Month", "Year", "Service"];
const PAYMENT_TERMS = ["Due on Receipt", "Net 7", "Net 15", "Net 30", "Net 45", "Net 60", "COD"];

const INDIAN_STATES: { code: string; name: string; isUT: boolean }[] = [
    { code: "01", name: "Jammu & Kashmir", isUT: true },
    { code: "02", name: "Himachal Pradesh", isUT: false },
    { code: "03", name: "Punjab", isUT: false },
    { code: "04", name: "Chandigarh", isUT: true },
    { code: "05", name: "Uttarakhand", isUT: false },
    { code: "06", name: "Haryana", isUT: false },
    { code: "07", name: "Delhi", isUT: true },
    { code: "08", name: "Rajasthan", isUT: false },
    { code: "09", name: "Uttar Pradesh", isUT: false },
    { code: "10", name: "Bihar", isUT: false },
    { code: "11", name: "Sikkim", isUT: false },
    { code: "12", name: "Arunachal Pradesh", isUT: false },
    { code: "13", name: "Nagaland", isUT: false },
    { code: "14", name: "Manipur", isUT: false },
    { code: "15", name: "Mizoram", isUT: false },
    { code: "16", name: "Tripura", isUT: false },
    { code: "17", name: "Meghalaya", isUT: false },
    { code: "18", name: "Assam", isUT: false },
    { code: "19", name: "West Bengal", isUT: false },
    { code: "20", name: "Jharkhand", isUT: false },
    { code: "21", name: "Odisha", isUT: false },
    { code: "22", name: "Chhattisgarh", isUT: false },
    { code: "23", name: "Madhya Pradesh", isUT: false },
    { code: "24", name: "Gujarat", isUT: false },
    { code: "25", name: "Dadra & Nagar Haveli and Daman & Diu", isUT: true },
    { code: "26", name: "Lakshadweep", isUT: true },
    { code: "27", name: "Maharashtra", isUT: false },
    { code: "29", name: "Karnataka", isUT: false },
    { code: "30", name: "Goa", isUT: false },
    { code: "31", name: "Ladakh", isUT: true },
    { code: "32", name: "Kerala", isUT: false },
    { code: "33", name: "Tamil Nadu", isUT: false },
    { code: "34", name: "Puducherry", isUT: true },
    { code: "35", name: "Andaman & Nicobar Islands", isUT: true },
    { code: "36", name: "Telangana", isUT: false },
    { code: "37", name: "Andhra Pradesh", isUT: false },
];

const FAQ_DATA = [
    {
        q: "When to use CGST+SGST vs IGST?",
        a: "Use CGST+SGST for intra-state supply (seller and buyer in the same state). Use IGST for inter-state supply (seller and buyer in different states). UTGST applies instead of SGST when the buyer is in a Union Territory.",
    },
    {
        q: "What is HSN/SAC code?",
        a: "HSN (Harmonized System of Nomenclature) is for goods; SAC (Services Accounting Code) is for services. If your turnover exceeds ₹5 crore, 8-digit HSN is mandatory. 4-digit is required for turnover between ₹1.5–5 crore. Below ₹1.5 crore, it's optional but recommended.",
    },
    {
        q: "What is Reverse Charge Mechanism (RCM)?",
        a: "Under RCM, the liability to pay GST shifts from the supplier to the recipient. It applies in specific cases like unregistered purchases, certain services (GTA, legal, etc.). When RCM applies, you must mention it on the invoice.",
    },
    {
        q: "Is this invoice legally valid under GST?",
        a: "This tool generates a template compliant with GST invoice rules. For legal validity, ensure correct GSTIN, mandatory fields (invoice number, date, HSN/SAC, tax breakup), and e-invoice (IRN/QR) if your turnover exceeds ₹5 crore.",
    },
    {
        q: "What GST rates apply in 2025?",
        a: "Common rates: 0% (essentials), 5% (food, transport), 12% (processed food, business class), 18% (most services, electronics), 28% (luxury, sin goods). Some items have special rates: 0.1%, 0.25%, 1%, 1.5%, 3%, 7.5%.",
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const fmtInt = (n: number) =>
    new Intl.NumberFormat("en-IN").format(Math.round(n));

function numberToWords(amount: number): string {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convert(n: number): string {
        if (n === 0) return "";
        if (n < 20) return ones[n] + " ";
        if (n < 100) return tens[Math.floor(n / 10)] + " " + ones[n % 10] + " ";
        if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred " + convert(n % 100);
        if (n < 100000) return convert(Math.floor(n / 1000)) + "Thousand " + convert(n % 1000);
        if (n < 10000000) return convert(Math.floor(n / 100000)) + "Lakh " + convert(n % 100000);
        return convert(Math.floor(n / 10000000)) + "Crore " + convert(n % 10000000);
    }

    const rounded = Math.floor(amount);
    const paise = Math.round((amount - rounded) * 100);
    let words = convert(rounded).trim();
    if (paise > 0) words += ` and ${convert(paise).trim()} Paise`;
    return "Indian Rupees " + words + " Only";
}

function determineGSTType(sellerState: string, buyerState: string): GSTType {
    if (!sellerState || !buyerState) return "none";
    if (sellerState === buyerState) {
        const buyerStateInfo = INDIAN_STATES.find(s => s.code === buyerState);
        return buyerStateInfo?.isUT ? "utgst" : "cgst_sgst";
    }
    return "igst";
}

function getGSTLabel(gstType: GSTType): string {
    if (gstType === "cgst_sgst") return "CGST + SGST";
    if (gstType === "igst") return "IGST";
    if (gstType === "utgst") return "CGST + UTGST";
    return "No GST";
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InvoiceGenerator() {
    const [sellerName, setSellerName] = useState("");
    const [sellerAddress, setSellerAddress] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [sellerPhone, setSellerPhone] = useState("");
    const [sellerGstin, setSellerGstin] = useState("");
    const [sellerPan, setSellerPan] = useState("");
    const [sellerState, setSellerState] = useState("");

    const [buyerName, setBuyerName] = useState("");
    const [buyerAddress, setBuyerAddress] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [buyerGstin, setBuyerGstin] = useState("");
    const [buyerState, setBuyerState] = useState("");

    const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`);
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
    const [dueDate, setDueDate] = useState("");
    const [poNumber, setPoNumber] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("Net 30");
    const [reverseCharge, setReverseCharge] = useState(false);

    const [items, setItems] = useState<InvoiceItem[]>([
        { id: 1, description: "", hsnSac: "", supplyType: "services", quantity: "1", unit: "Nos", rate: "", gstRate: "18" },
    ]);

    const [discountType, setDiscountType] = useState<DiscountType>("percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [roundOff, setRoundOff] = useState(true);
    const [notes, setNotes] = useState("");

    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [accountName, setAccountName] = useState("");

    const [result, setResult] = useState<InvoiceResult | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"seller" | "buyer" | "invoice" | "items" | "tax" | "bank">("seller");
    const [errors, setErrors] = useState<string[]>([]);
    const printRef = useRef<HTMLDivElement>(null);

    const autoGSTType = determineGSTType(sellerState, buyerState);

    const addItem = () => {
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems([...items, { id: newId, description: "", hsnSac: "", supplyType: "services", quantity: "1", unit: "Nos", rate: "", gstRate: "18" }]);
    };

    const removeItem = (id: number) => {
        if (items.length > 1) setItems(items.filter(i => i.id !== id));
    };

    const updateItem = (id: number, field: keyof InvoiceItem, value: string) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const calcSubtotal = (): number =>
        items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0), 0);

    const calcDiscount = (subtotal: number): number => {
        const val = parseFloat(discountValue) || 0;
        return discountType === "percentage" ? (subtotal * val) / 100 : val;
    };

    const calcTaxableAmount = (): number => {
        const s = calcSubtotal();
        return s - calcDiscount(s);
    };

    const validate = (): string[] => {
        const errs: string[] = [];
        if (!sellerName.trim()) errs.push("Seller name is required");
        if (!buyerName.trim()) errs.push("Buyer name is required");
        if (!invoiceNumber.trim()) errs.push("Invoice number is required");
        const validItems = items.filter(i => i.description && parseFloat(i.rate) > 0);
        if (validItems.length === 0) errs.push("At least one item with description and rate is required");
        if (sellerGstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(sellerGstin.toUpperCase())) {
            errs.push("Seller GSTIN format is invalid (e.g. 27AAPFU0939F1ZV)");
        }
        return errs;
    };

    const generateInvoice = () => {
        const errs = validate();
        if (errs.length > 0) { setErrors(errs); return; }
        setErrors([]);

        const gstType = autoGSTType;
        const subtotal = calcSubtotal();
        const discountAmt = calcDiscount(subtotal);
        const taxableAmount = subtotal - discountAmt;

        const resultItems: ResultItem[] = items
            .filter(i => i.description && parseFloat(i.rate) > 0)
            .map(item => {
                const qty = parseFloat(item.quantity) || 0;
                const rate = parseFloat(item.rate) || 0;
                const gstRate = parseFloat(item.gstRate) || 0;
                const itemAmount = qty * rate;
                const itemDiscountRatio = subtotal > 0 ? itemAmount / subtotal : 0;
                const itemTaxable = itemAmount - (discountAmt * itemDiscountRatio);
                const gstAmount = (itemTaxable * gstRate) / 100;

                return {
                    description: item.description,
                    hsnSac: item.hsnSac,
                    quantity: qty,
                    unit: item.unit,
                    rate,
                    amount: itemAmount,
                    gstRate,
                    gstAmount,
                    cgst: gstType === "cgst_sgst" ? gstAmount / 2 : gstType === "utgst" ? gstAmount / 2 : 0,
                    sgst: gstType === "cgst_sgst" ? gstAmount / 2 : 0,
                    igst: gstType === "igst" ? gstAmount : 0,
                    utgst: gstType === "utgst" ? gstAmount / 2 : 0,
                    total: itemTaxable + gstAmount,
                };
            });

        const totalGst = resultItems.reduce((s, i) => s + i.gstAmount, 0);
        const totalCgst = resultItems.reduce((s, i) => s + i.cgst, 0);
        const totalSgst = resultItems.reduce((s, i) => s + i.sgst, 0);
        const totalIgst = resultItems.reduce((s, i) => s + i.igst, 0);
        const totalUtgst = resultItems.reduce((s, i) => s + i.utgst, 0);
        const rawTotal = taxableAmount + totalGst;
        const roundOffAmt = roundOff ? Math.round(rawTotal) - rawTotal : 0;
        const grandTotal = rawTotal + roundOffAmt;

        const buyerStateInfo = INDIAN_STATES.find(s => s.code === buyerState);

        setResult({
            sellerName, sellerAddress, sellerEmail, sellerPhone,
            sellerGstin: sellerGstin.toUpperCase(), sellerPan: sellerPan.toUpperCase(), sellerState,
            buyerName, buyerAddress, buyerEmail, buyerPhone,
            buyerGstin: buyerGstin.toUpperCase(), buyerState,
            buyerStateCode: buyerStateInfo?.code || "",
            invoiceNumber, invoiceDate,
            dueDate: dueDate || new Date(new Date(invoiceDate).setDate(new Date(invoiceDate).getDate() + 30)).toISOString().split("T")[0],
            poNumber, paymentTerms,
            placeOfSupply: buyerStateInfo ? `${buyerStateInfo.code} - ${buyerStateInfo.name}` : "",
            gstType, reverseCharge,
            items: resultItems,
            subtotal, discountType, discountValue: parseFloat(discountValue) || 0,
            discountAmount: discountAmt, taxableAmount,
            totalCgst, totalSgst, totalIgst, totalUtgst,
            roundOff: roundOffAmt,
            grandTotal,
            amountInWords: numberToWords(grandTotal),
            notes: notes || "Thank you for your business!",
            bankName, accountNumber, ifscCode, accountName,
        });
    };

    const handlePrint = () => {
        if (!printRef.current || !result) return;
        const w = window.open("", "_blank");
        if (!w) return;
        w.document.write(`<!DOCTYPE html><html><head><title>Invoice ${result.invoiceNumber}</title>
        <style>
            *{box-sizing:border-box;margin:0;padding:0}
            body{font-family:'Arial',sans-serif;color:#111;background:#fff;padding:0}
            .page{max-width:794px;margin:0 auto;padding:32px 40px}
            table{width:100%;border-collapse:collapse}
            th,td{padding:7px 10px}
            @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
        </style>
        </head><body><div class="page">${printRef.current.innerHTML}</div>
        <script>window.onload=()=>{window.print();}<\/script></body></html>`);
        w.document.close();
    };

    const reset = () => {
        setSellerName(""); setSellerAddress(""); setSellerEmail(""); setSellerPhone("");
        setSellerGstin(""); setSellerPan(""); setSellerState("");
        setBuyerName(""); setBuyerAddress(""); setBuyerEmail(""); setBuyerPhone("");
        setBuyerGstin(""); setBuyerState("");
        setInvoiceNumber(`INV-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`);
        setInvoiceDate(new Date().toISOString().split("T")[0]);
        setDueDate(""); setPoNumber(""); setPaymentTerms("Net 30"); setReverseCharge(false);
        setItems([{ id: 1, description: "", hsnSac: "", supplyType: "services", quantity: "1", unit: "Nos", rate: "", gstRate: "18" }]);
        setDiscountType("percentage"); setDiscountValue(""); setRoundOff(true); setNotes("");
        setBankName(""); setAccountNumber(""); setIfscCode(""); setAccountName("");
        setResult(null); setErrors([]);
    };

    const tabs = [
        { id: "seller", label: "Seller" },
        { id: "buyer", label: "Buyer" },
        { id: "invoice", label: "Invoice" },
        { id: "items", label: "Items" },
        { id: "tax", label: "Tax & More" },
        { id: "bank", label: "Bank" },
    ] as const;

    const inputCls = "w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-teal-500 transition-colors";
    const labelCls = "text-xs text-gray-500 mb-1 block";
    const selectCls = inputCls + " cursor-pointer";

    return (
        <div className="space-y-6">
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
                    <li><a href="https://www.numrexo.com" className="hover:text-gray-300 transition-colors">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://www.numrexo.com/business" className="hover:text-gray-300 transition-colors">Business Tools</a></li>
                    <li className="text-gray-700">/</li>
                    <li className="text-gray-300">GST Invoice Generator</li>
                </ol>
            </nav>

            {sellerState && buyerState && (
                <div className={`flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-lg text-sm border ${autoGSTType === "igst"
                    ? "bg-blue-950/40 border-blue-700/50 text-blue-300"
                    : autoGSTType === "utgst"
                        ? "bg-purple-950/40 border-purple-700/50 text-purple-300"
                        : "bg-teal-950/40 border-teal-700/50 text-teal-300"
                    }`}>
                    <span className="font-semibold">Auto-detected:</span>
                    <span className="font-bold">{getGSTLabel(autoGSTType)}</span>
                    <span className="text-xs opacity-70">
                        {autoGSTType === "igst" ? "Inter-state supply" : autoGSTType === "utgst" ? "Union Territory supply" : "Intra-state supply"}
                    </span>
                </div>
            )}

            {errors.length > 0 && (
                <div className="bg-red-950/40 border border-red-700/50 rounded-lg p-4">
                    <p className="text-red-400 text-sm font-semibold mb-2">Please fix the following:</p>
                    <ul className="space-y-1">
                        {errors.map((e, i) => <li key={i} className="text-red-300 text-xs flex gap-2"><span>•</span>{e}</li>)}
                    </ul>
                </div>
            )}

            {/* Form Panel */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="flex border-b border-gray-800 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id
                                ? "text-teal-400 border-teal-400 bg-teal-950/20"
                                : "text-gray-500 border-transparent hover:text-gray-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-5">
                    {/* SELLER */}
                    {activeTab === "seller" && (
                        <div className="space-y-3">
                            <div>
                                <label className={labelCls}>Business / Seller Name *</label>
                                <input type="text" placeholder="ABC Pvt. Ltd." value={sellerName} onChange={e => setSellerName(e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Address</label>
                                <textarea rows={2} placeholder="Full address with city, state, PIN" value={sellerAddress} onChange={e => setSellerAddress(e.target.value)} className={inputCls + " resize-none"} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Email</label>
                                    <input type="email" placeholder="billing@company.com" value={sellerEmail} onChange={e => setSellerEmail(e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Phone</label>
                                    <input type="tel" placeholder="+91 98765 43210" value={sellerPhone} onChange={e => setSellerPhone(e.target.value)} className={inputCls} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>GSTIN</label>
                                    <input type="text" placeholder="27AAPFU0939F1ZV" maxLength={15} value={sellerGstin} onChange={e => setSellerGstin(e.target.value.toUpperCase())} className={inputCls + " uppercase font-mono"} />
                                </div>
                                <div>
                                    <label className={labelCls}>PAN</label>
                                    <input type="text" placeholder="AAPFU0939F" maxLength={10} value={sellerPan} onChange={e => setSellerPan(e.target.value.toUpperCase())} className={inputCls + " uppercase font-mono"} />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>State (for GST type detection)</label>
                                <select value={sellerState} onChange={e => setSellerState(e.target.value)} className={selectCls}>
                                    <option value="">Select seller state</option>
                                    {INDIAN_STATES.map(s => (
                                        <option key={s.code} value={s.code}>{s.code} — {s.name}{s.isUT ? " (UT)" : ""}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* BUYER */}
                    {activeTab === "buyer" && (
                        <div className="space-y-3">
                            <div>
                                <label className={labelCls}>Client / Buyer Name *</label>
                                <input type="text" placeholder="XYZ Technologies" value={buyerName} onChange={e => setBuyerName(e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Address</label>
                                <textarea rows={2} placeholder="Full billing address" value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} className={inputCls + " resize-none"} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Email</label>
                                    <input type="email" placeholder="accounts@client.com" value={buyerEmail} onChange={e => setBuyerEmail(e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Phone</label>
                                    <input type="tel" placeholder="+91 98765 43210" value={buyerPhone} onChange={e => setBuyerPhone(e.target.value)} className={inputCls} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Buyer GSTIN</label>
                                    <input type="text" placeholder="29AAACG2115R1ZN" maxLength={15} value={buyerGstin} onChange={e => setBuyerGstin(e.target.value.toUpperCase())} className={inputCls + " uppercase font-mono"} />
                                </div>
                                <div>
                                    <label className={labelCls}>State (Place of Supply)</label>
                                    <select value={buyerState} onChange={e => setBuyerState(e.target.value)} className={selectCls}>
                                        <option value="">Select buyer state</option>
                                        {INDIAN_STATES.map(s => (
                                            <option key={s.code} value={s.code}>{s.code} — {s.name}{s.isUT ? " (UT)" : ""}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INVOICE */}
                    {activeTab === "invoice" && (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Invoice Number *</label>
                                    <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>PO / Reference Number</label>
                                    <input type="text" placeholder="PO-2025-001" value={poNumber} onChange={e => setPoNumber(e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Invoice Date</label>
                                    <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Due Date</label>
                                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Payment Terms</label>
                                <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className={selectCls}>
                                    {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                <input type="checkbox" id="rcm" checked={reverseCharge} onChange={e => setReverseCharge(e.target.checked)} className="w-4 h-4 accent-teal-500 rounded" />
                                <label htmlFor="rcm" className="text-sm text-gray-300 cursor-pointer">
                                    Reverse Charge Mechanism (RCM) applicable
                                </label>
                            </div>
                        </div>
                    )}

                    {/* ITEMS */}
                    {activeTab === "items" && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">Add items/services with HSN/SAC codes and per-item GST rate</p>
                                <button onClick={addItem} className="text-xs px-3 py-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-lg hover:bg-teal-500/20 transition-colors">
                                    + Add Row
                                </button>
                            </div>
                            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                {items.map((item, idx) => (
                                    <div key={item.id} className="bg-[#0d1117] border border-gray-800 rounded-lg p-3 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500 font-semibold">Item {idx + 1}</span>
                                            {items.length > 1 && (
                                                <button onClick={() => removeItem(item.id)} className="text-red-500/60 hover:text-red-400 text-xs px-2 py-1 rounded transition-colors">Remove</button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-2">
                                                <input type="text" placeholder="Description of goods/services *" value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} className={inputCls} />
                                            </div>
                                            <div>
                                                <input type="text" placeholder="HSN / SAC" value={item.hsnSac} onChange={e => updateItem(item.id, "hsnSac", e.target.value)} className={inputCls + " font-mono"} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <div>
                                                <input type="number" placeholder="Qty" min="0" step="1" value={item.quantity} onChange={e => updateItem(item.id, "quantity", e.target.value)} className={inputCls} />
                                            </div>
                                            <div>
                                                <select value={item.unit} onChange={e => updateItem(item.id, "unit", e.target.value)} className={selectCls}>
                                                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <input type="number" placeholder="Rate (₹)" min="0" step="1" value={item.rate} onChange={e => updateItem(item.id, "rate", e.target.value)} className={inputCls} />
                                            </div>
                                            <div>
                                                <select value={item.gstRate} onChange={e => updateItem(item.id, "gstRate", e.target.value)} className={selectCls}>
                                                    {GST_RATES.map(r => <option key={r} value={r}>{r}% GST</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        {item.quantity && item.rate && (
                                            <div className="text-xs text-gray-500 flex gap-3">
                                                <span>Amount: <span className="text-gray-300">₹{fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}</span></span>
                                                <span>GST: <span className="text-teal-400">₹{fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0) * (parseFloat(item.gstRate) || 0) / 100)}</span></span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {items.some(i => i.description && parseFloat(i.rate) > 0) && (
                                <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-3 text-sm flex justify-between items-center">
                                    <span className="text-gray-500">Subtotal (before tax)</span>
                                    <span className="text-white font-semibold">₹{fmt(calcSubtotal())}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAX & MORE */}
                    {activeTab === "tax" && (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Discount Type</label>
                                    <select value={discountType} onChange={e => setDiscountType(e.target.value as DiscountType)} className={selectCls}>
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelCls}>Discount Value</label>
                                    <input type="number" min="0" step="0.01" placeholder="0" value={discountValue} onChange={e => setDiscountValue(e.target.value)} className={inputCls} />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="roundoff" checked={roundOff} onChange={e => setRoundOff(e.target.checked)} className="w-4 h-4 accent-teal-500" />
                                <label htmlFor="roundoff" className="text-sm text-gray-300 cursor-pointer">Enable Round Off</label>
                            </div>
                            <div>
                                <label className={labelCls}>Notes / Payment Instructions</label>
                                <textarea rows={3} placeholder="Bank transfer preferred. Late payment: 2% per month interest after due date." value={notes} onChange={e => setNotes(e.target.value)} className={inputCls + " resize-none"} />
                            </div>
                            {calcSubtotal() > 0 && (
                                <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-3 space-y-1.5 text-sm">
                                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-gray-300">₹{fmt(calcSubtotal())}</span></div>
                                    {parseFloat(discountValue) > 0 && (
                                        <div className="flex justify-between text-green-500/80"><span>Discount</span><span>-₹{fmt(calcDiscount(calcSubtotal()))}</span></div>
                                    )}
                                    <div className="flex justify-between text-gray-500"><span>Taxable Amount</span><span className="text-gray-300">₹{fmt(calcTaxableAmount())}</span></div>
                                    <div className="flex justify-between font-semibold text-teal-400 border-t border-gray-800 pt-1.5">
                                        <span>GST Type</span>
                                        <span>{getGSTLabel(autoGSTType)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* BANK */}
                    {activeTab === "bank" && (
                        <div className="space-y-3">
                            <p className="text-xs text-gray-500">Optional: Bank details for payment (printed on invoice)</p>
                            <div>
                                <label className={labelCls}>Account Holder Name</label>
                                <input type="text" placeholder="ABC Pvt. Ltd." value={accountName} onChange={e => setAccountName(e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Bank Name</label>
                                <input type="text" placeholder="HDFC Bank" value={bankName} onChange={e => setBankName(e.target.value)} className={inputCls} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Account Number</label>
                                    <input type="text" placeholder="12345678901234" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className={inputCls + " font-mono"} />
                                </div>
                                <div>
                                    <label className={labelCls}>IFSC Code</label>
                                    <input type="text" placeholder="HDFC0001234" maxLength={11} value={ifscCode} onChange={e => setIfscCode(e.target.value.toUpperCase())} className={inputCls + " font-mono uppercase"} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={generateInvoice}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-sm hover:from-teal-400 hover:to-teal-500 transition-all active:scale-[0.98] shadow-lg shadow-teal-900/30"
                        >
                            Generate Invoice →
                        </button>
                        <button onClick={reset} className="px-5 py-3 rounded-xl bg-gray-800 text-gray-300 font-semibold text-sm hover:bg-gray-700 transition-colors">
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* INVOICE PREVIEW */}
            {result && (
                <div className="space-y-4">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: "Invoice Total", value: `₹${fmtInt(result.grandTotal)}`, color: "text-teal-400" },
                            { label: "Taxable Amount", value: `₹${fmtInt(result.taxableAmount)}`, color: "text-blue-400" },
                            {
                                label: result.gstType === "igst" ? "Total IGST" : result.gstType === "utgst" ? "CGST + UTGST" : "CGST + SGST",
                                value: `₹${fmtInt(result.totalCgst + result.totalSgst + result.totalIgst + result.totalUtgst)}`,
                                color: "text-orange-400"
                            },
                            { label: "GST Type", value: getGSTLabel(result.gstType), color: "text-purple-400" },
                        ].map((card, i) => (
                            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl p-3">
                                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                                <p className={`text-base font-bold ${card.color}`}>{card.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors">
                            🖨️ Print / Save PDF
                        </button>
                    </div>

                    {/* Printable Invoice */}
                    <div ref={printRef} className="bg-white text-black rounded-xl overflow-hidden shadow-xl">
                        {/* Header */}
                        <div className="bg-[#0f172a] text-white px-8 py-6 flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold tracking-widest text-white">INVOICE</h1>
                                {result.reverseCharge && (
                                    <span className="inline-block mt-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs px-3 py-1 rounded">
                                        Reverse Charge: YES
                                    </span>
                                )}
                            </div>
                            <div className="text-right text-sm">
                                <p className="text-gray-400 text-xs">Invoice No.</p>
                                <p className="text-white font-bold text-lg">{result.invoiceNumber}</p>
                                <p className="text-gray-400 text-xs mt-1">Date: <span className="text-white">{result.invoiceDate}</span></p>
                                <p className="text-gray-400 text-xs">Due: <span className="text-yellow-300">{result.dueDate}</span></p>
                                {result.poNumber && <p className="text-gray-400 text-xs">PO: <span className="text-white">{result.poNumber}</span></p>}
                            </div>
                        </div>

                        {/* GST Info Bar */}
                        <div className="bg-green-50 border-b border-green-200 px-8 py-2 flex flex-wrap gap-6 text-xs">
                            <span className="text-green-800"><strong>GST Type:</strong> {getGSTLabel(result.gstType)}</span>
                            {result.placeOfSupply && <span className="text-green-800"><strong>Place of Supply:</strong> {result.placeOfSupply}</span>}
                            <span className="text-green-800"><strong>Payment Terms:</strong> {result.paymentTerms}</span>
                            {result.reverseCharge && <span className="text-orange-700 font-semibold">⚠ Reverse Charge Applicable</span>}
                        </div>

                        {/* Parties */}
                        <div className="grid grid-cols-2">
                            <div className="px-8 py-5 border-r border-b border-gray-200">
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Bill From</p>
                                <p className="font-bold text-gray-900 text-base">{result.sellerName}</p>
                                {result.sellerAddress && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{result.sellerAddress}</p>}
                                {result.sellerEmail && <p className="text-xs text-gray-500 mt-1">{result.sellerEmail}</p>}
                                {result.sellerPhone && <p className="text-xs text-gray-500">{result.sellerPhone}</p>}
                                {result.sellerGstin && (
                                    <span className="inline-block mt-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded font-mono">
                                        GSTIN: {result.sellerGstin}
                                    </span>
                                )}
                                {result.sellerPan && <p className="text-xs text-gray-400 mt-1 font-mono">PAN: {result.sellerPan}</p>}
                            </div>
                            <div className="px-8 py-5 border-b border-gray-200">
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Bill To</p>
                                <p className="font-bold text-gray-900 text-base">{result.buyerName}</p>
                                {result.buyerAddress && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{result.buyerAddress}</p>}
                                {result.buyerEmail && <p className="text-xs text-gray-500 mt-1">{result.buyerEmail}</p>}
                                {result.buyerPhone && <p className="text-xs text-gray-500">{result.buyerPhone}</p>}
                                {result.buyerGstin && (
                                    <span className="inline-block mt-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded font-mono">
                                        GSTIN: {result.buyerGstin}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="px-8 py-5">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gray-900 text-white">
                                        <th className="py-2.5 px-3 text-left text-xs font-semibold tracking-wide w-8">#</th>
                                        <th className="py-2.5 px-3 text-left text-xs font-semibold tracking-wide">Description</th>
                                        <th className="py-2.5 px-3 text-center text-xs font-semibold tracking-wide">HSN/SAC</th>
                                        <th className="py-2.5 px-3 text-center text-xs font-semibold tracking-wide">Qty</th>
                                        <th className="py-2.5 px-3 text-right text-xs font-semibold tracking-wide">Rate (₹)</th>
                                        <th className="py-2.5 px-3 text-right text-xs font-semibold tracking-wide">Amount (₹)</th>
                                        <th className="py-2.5 px-3 text-right text-xs font-semibold tracking-wide">GST%</th>
                                        <th className="py-2.5 px-3 text-right text-xs font-semibold tracking-wide">Tax (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.items.map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="py-2.5 px-3 text-xs text-gray-400">{idx + 1}</td>
                                            <td className="py-2.5 px-3 text-gray-800 font-medium">{item.description}</td>
                                            <td className="py-2.5 px-3 text-center text-xs font-mono text-gray-500">{item.hsnSac || "—"}</td>
                                            <td className="py-2.5 px-3 text-center text-xs text-gray-600">{item.quantity} {item.unit}</td>
                                            <td className="py-2.5 px-3 text-right text-xs text-gray-600">{fmt(item.rate)}</td>
                                            <td className="py-2.5 px-3 text-right text-xs font-medium text-gray-800">{fmt(item.amount)}</td>
                                            <td className="py-2.5 px-3 text-right text-xs text-gray-500">{item.gstRate}%</td>
                                            <td className="py-2.5 px-3 text-right text-xs font-medium text-blue-700">{fmt(item.gstAmount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* GST Breakup + Totals */}
                        <div className="px-8 pb-5 grid grid-cols-2 gap-8">
                            {/* GST Breakup */}
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">GST Breakup</p>
                                <table className="w-full text-xs border border-gray-200 rounded overflow-hidden">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-3 text-left text-gray-600 font-semibold">Rate</th>
                                            <th className="py-2 px-3 text-right text-gray-600 font-semibold">Taxable</th>
                                            {result.gstType === "cgst_sgst" && <>
                                                <th className="py-2 px-3 text-right text-gray-600 font-semibold">CGST</th>
                                                <th className="py-2 px-3 text-right text-gray-600 font-semibold">SGST</th>
                                            </>}
                                            {result.gstType === "igst" && <th className="py-2 px-3 text-right text-gray-600 font-semibold">IGST</th>}
                                            {result.gstType === "utgst" && <>
                                                <th className="py-2 px-3 text-right text-gray-600 font-semibold">CGST</th>
                                                <th className="py-2 px-3 text-right text-gray-600 font-semibold">UTGST</th>
                                            </>}
                                            {result.gstType === "none" && <th className="py-2 px-3 text-right text-gray-600 font-semibold">GST</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from(new Set(result.items.map(i => i.gstRate))).map(rate => {
                                            const rateItems = result.items.filter(i => i.gstRate === rate);
                                            const taxable = rateItems.reduce((s, i) => {
                                                const ratio = result.subtotal > 0 ? i.amount / result.subtotal : 0;
                                                return s + i.amount - result.discountAmount * ratio;
                                            }, 0);
                                            const tax = rateItems.reduce((s, i) => s + i.gstAmount, 0);
                                            return (
                                                <tr key={rate} className="border-t border-gray-100">
                                                    <td className="py-1.5 px-3 text-gray-700 font-medium">{rate}%</td>
                                                    <td className="py-1.5 px-3 text-right text-gray-600">{fmt(taxable)}</td>
                                                    {result.gstType === "cgst_sgst" && <>
                                                        <td className="py-1.5 px-3 text-right text-blue-700">{fmt(tax / 2)}</td>
                                                        <td className="py-1.5 px-3 text-right text-blue-700">{fmt(tax / 2)}</td>
                                                    </>}
                                                    {result.gstType === "igst" && <td className="py-1.5 px-3 text-right text-blue-700">{fmt(tax)}</td>}
                                                    {result.gstType === "utgst" && <>
                                                        <td className="py-1.5 px-3 text-right text-blue-700">{fmt(tax / 2)}</td>
                                                        <td className="py-1.5 px-3 text-right text-blue-700">{fmt(tax / 2)}</td>
                                                    </>}
                                                    {result.gstType === "none" && <td className="py-1.5 px-3 text-right text-blue-700">{fmt(tax)}</td>}
                                                </tr>
                                            );
                                        })}
                                        <tr className="border-t-2 border-gray-300 bg-gray-50">
                                            <td className="py-2 px-3 font-bold text-gray-800">Total</td>
                                            <td className="py-2 px-3 text-right font-bold text-gray-800">{fmt(result.taxableAmount)}</td>
                                            {result.gstType === "cgst_sgst" && <>
                                                <td className="py-2 px-3 text-right font-bold text-blue-800">{fmt(result.totalCgst)}</td>
                                                <td className="py-2 px-3 text-right font-bold text-blue-800">{fmt(result.totalSgst)}</td>
                                            </>}
                                            {result.gstType === "igst" && <td className="py-2 px-3 text-right font-bold text-blue-800">{fmt(result.totalIgst)}</td>}
                                            {result.gstType === "utgst" && <>
                                                <td className="py-2 px-3 text-right font-bold text-blue-800">{fmt(result.totalCgst)}</td>
                                                <td className="py-2 px-3 text-right font-bold text-blue-800">{fmt(result.totalUtgst)}</td>
                                            </>}
                                            {result.gstType === "none" && <td className="py-2 px-3 text-right font-bold text-blue-800">—</td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Summary Totals */}
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Summary</p>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>₹{fmt(result.subtotal)}</span></div>
                                    {result.discountAmount > 0 && (
                                        <div className="flex justify-between text-sm text-green-700">
                                            <span>Discount ({result.discountType === "percentage" ? `${result.discountValue}%` : `₹${result.discountValue}`})</span>
                                            <span>-₹{fmt(result.discountAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-1.5"><span>Taxable Amount</span><span className="font-semibold">₹{fmt(result.taxableAmount)}</span></div>
                                    {result.gstType === "cgst_sgst" && <>
                                        <div className="flex justify-between text-sm text-blue-700"><span>CGST</span><span>₹{fmt(result.totalCgst)}</span></div>
                                        <div className="flex justify-between text-sm text-blue-700"><span>SGST</span><span>₹{fmt(result.totalSgst)}</span></div>
                                    </>}
                                    {result.gstType === "igst" && <div className="flex justify-between text-sm text-blue-700"><span>IGST</span><span>₹{fmt(result.totalIgst)}</span></div>}
                                    {result.gstType === "utgst" && <>
                                        <div className="flex justify-between text-sm text-blue-700"><span>CGST</span><span>₹{fmt(result.totalCgst)}</span></div>
                                        <div className="flex justify-between text-sm text-blue-700"><span>UTGST</span><span>₹{fmt(result.totalUtgst)}</span></div>
                                    </>}
                                    {result.roundOff !== 0 && (
                                        <div className="flex justify-between text-xs text-gray-400"><span>Round Off</span><span>{result.roundOff >= 0 ? "+" : ""}{fmt(result.roundOff)}</span></div>
                                    )}
                                    <div className="flex justify-between text-base font-bold text-gray-900 border-t-2 border-gray-900 pt-2 mt-2">
                                        <span>Grand Total</span>
                                        <span>₹{fmt(result.grandTotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amount in Words */}
                        <div className="mx-8 mb-4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Amount in Words</p>
                            <p className="text-sm font-semibold text-gray-800">{result.amountInWords}</p>
                        </div>

                        {/* Bank + Notes */}
                        <div className="px-8 pb-6 grid grid-cols-2 gap-6">
                            {result.bankName && (
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Bank Details</p>
                                    <div className="space-y-1 text-xs text-gray-600">
                                        <div className="flex gap-2"><span className="w-24 text-gray-400">Account Name</span><span className="font-medium text-gray-800">{result.accountName || result.sellerName}</span></div>
                                        <div className="flex gap-2"><span className="w-24 text-gray-400">Bank</span><span className="font-medium text-gray-800">{result.bankName}</span></div>
                                        <div className="flex gap-2"><span className="w-24 text-gray-400">Account No.</span><span className="font-mono font-medium text-gray-800">{result.accountNumber}</span></div>
                                        <div className="flex gap-2"><span className="w-24 text-gray-400">IFSC</span><span className="font-mono font-medium text-gray-800">{result.ifscCode}</span></div>
                                    </div>
                                </div>
                            )}
                            <div className={result.bankName ? "" : "col-span-2"}>
                                {result.notes && (
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Notes</p>
                                        <p className="text-xs text-gray-600 leading-relaxed">{result.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 flex justify-between items-end">
                            <div className="text-xs text-gray-400">
                                <p>This is a computer-generated invoice.</p>
                                {result.reverseCharge && <p className="text-orange-600 font-semibold mt-1">Tax payable on reverse charge basis.</p>}
                            </div>
                            <div className="text-right">
                                <div className="w-36 border-t border-gray-400 pt-1 text-xs text-gray-500">Authorised Signatory</div>
                                <p className="text-xs font-semibold text-gray-700 mt-0.5">{result.sellerName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* About */}
            <section>
                <h2 className="text-xl font-semibold text-white mb-3">About GST Invoice Generator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Generate fully GST-compliant invoices with automatic tax type detection — CGST+SGST for intra-state, IGST for inter-state, and CGST+UTGST for Union Territory supplies. Supports HSN/SAC codes, per-item GST rates, reverse charge, detailed GST breakup table, amount in words, bank details, and round-off. Print or save as PDF in one click. Covers all 37 Indian states and union territories.
                </p>
            </section>

            {/* FAQ */}
            <section>
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
