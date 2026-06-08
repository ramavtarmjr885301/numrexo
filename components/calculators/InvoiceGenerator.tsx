"use client";

import { useState, useRef } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What information should be on an invoice?",
        a: "Invoice number, date, your business name and address, client name and address, description of items/services, quantity, rate, subtotal, taxes, total amount, and payment terms.",
    },
    {
        q: "Is this invoice legally valid?",
        a: "This generates a professional invoice template. For legal validity, ensure you include GST/VAT numbers (if applicable), proper invoice numbering, and your business registration details.",
    },
    {
        q: "What are common payment terms?",
        a: "Net 15 (due in 15 days), Net 30 (due in 30 days), Due on Receipt, COD (Cash on Delivery), or specify a custom due date. Always include late payment penalty information.",
    },
    {
        q: "Do I need to charge GST on my invoice?",
        a: "If your annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states), you need GST registration and must charge GST on your invoices.",
    },
];

interface InvoiceItem {
    id: number;
    description: string;
    quantity: string;
    rate: string;
}

export default function InvoiceGenerator() {
    // Business Details
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [gstNumber, setGstNumber] = useState("");

    // Client Details
    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    // Invoice Details
    const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-8)}`);
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("Net 30");

    // Items
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: 1, description: "", quantity: "1", rate: "" },
    ]);

    // Tax & Discount
    const [taxRate, setTaxRate] = useState("18");
    const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [notes, setNotes] = useState("");

    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const addItem = () => {
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems([...items, { id: newId, description: "", quantity: "1", rate: "" }]);
    };

    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const updateItem = (id: number, field: keyof InvoiceItem, value: string) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const calculateSubtotal = (): number => {
        let subtotal = 0;
        for (const item of items) {
            const quantity = parseFloat(item.quantity) || 0;
            const rate = parseFloat(item.rate) || 0;
            subtotal += quantity * rate;
        }
        return subtotal;
    };

    const calculateDiscount = (subtotal: number): number => {
        const discount = parseFloat(discountValue) || 0;
        if (discountType === "percentage") {
            return (subtotal * discount) / 100;
        }
        return discount;
    };

    const calculateTax = (subtotal: number, discount: number): number => {
        const tax = parseFloat(taxRate) || 0;
        const taxableAmount = subtotal - discount;
        return (taxableAmount * tax) / 100;
    };

    const calculateTotal = (): number => {
        const subtotal = calculateSubtotal();
        const discount = calculateDiscount(subtotal);
        const tax = calculateTax(subtotal, discount);
        return subtotal - discount + tax;
    };

    const generateInvoice = () => {
        if (!businessName || !clientName) {
            alert("Please enter at least Business Name and Client Name");
            return;
        }

        const subtotal = calculateSubtotal();
        const discount = calculateDiscount(subtotal);
        const tax = calculateTax(subtotal, discount);
        const total = calculateTotal();

        const validItems = items.filter(i => i.description && parseFloat(i.rate) > 0);

        if (validItems.length === 0) {
            alert("Please add at least one item with description and rate");
            return;
        }

        setResult({
            businessName: businessName || "Your Business Name",
            businessAddress: businessAddress || "",
            businessEmail: businessEmail || "",
            businessPhone: businessPhone || "",
            gstNumber: gstNumber || "",
            clientName: clientName,
            clientAddress: clientAddress || "",
            clientEmail: clientEmail || "",
            clientPhone: clientPhone || "",
            invoiceNumber: invoiceNumber,
            invoiceDate: invoiceDate,
            dueDate: dueDate || new Date(new Date(invoiceDate).setDate(new Date(invoiceDate).getDate() + 30)).toISOString().split('T')[0],
            paymentTerms: paymentTerms,
            items: validItems.map(i => ({
                description: i.description,
                quantity: parseFloat(i.quantity) || 1,
                rate: parseFloat(i.rate) || 0,
                amount: ((parseFloat(i.quantity) || 1) * (parseFloat(i.rate) || 0)).toFixed(2),
            })),
            subtotal: subtotal.toFixed(2),
            discountType: discountType,
            discountValue: discountValue || "0",
            discountAmount: discount.toFixed(2),
            taxRate: taxRate,
            taxAmount: tax.toFixed(2),
            total: total.toFixed(2),
            notes: notes || "Thank you for your business!",
        });
    };

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const originalContents = document.body.innerHTML;
        const printWindow = window.open('', '_blank');

        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice ${invoiceNumber}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                            .invoice-container { max-width: 800px; margin: 0 auto; }
                            .header { text-align: center; margin-bottom: 30px; }
                            .section { margin-bottom: 20px; }
                            .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
                            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                            th { background-color: #f2f2f2; }
                            .total-row { font-weight: bold; }
                            @media print {
                                button { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="invoice-container">
                            ${printContent.innerHTML}
                        </div>
                        <script>window.print(); window.close();<\/script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const reset = () => {
        setBusinessName("");
        setBusinessAddress("");
        setBusinessEmail("");
        setBusinessPhone("");
        setGstNumber("");
        setClientName("");
        setClientAddress("");
        setClientEmail("");
        setClientPhone("");
        setInvoiceNumber(`INV-${Date.now().toString().slice(-8)}`);
        setInvoiceDate(new Date().toISOString().split('T')[0]);
        setDueDate("");
        setPaymentTerms("Net 30");
        setItems([{ id: 1, description: "", quantity: "1", rate: "" }]);
        setTaxRate("18");
        setDiscountType("percentage");
        setDiscountValue("");
        setNotes("");
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://www.numrexo.com/business" className="hover:text-gray-300">Business Tools</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Invoice Generator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Invoice Details</h3>
                        <p className="text-xs text-gray-500">Fill in your business and invoice information</p>
                    </div>
                    <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                        {/* Business Details */}
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <h4 className="text-sm font-semibold text-teal-400 mb-2">🏢 Business Details</h4>
                            <div className="space-y-2">
                                <input type="text" placeholder="Business Name *" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <input type="text" placeholder="Business Address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <div className="flex gap-2">
                                    <input type="email" placeholder="Email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                    <input type="tel" placeholder="Phone" value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                </div>
                                <input type="text" placeholder="GST/VAT Number (if applicable)" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                            </div>
                        </div>

                        {/* Client Details */}
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">👤 Client Details</h4>
                            <div className="space-y-2">
                                <input type="text" placeholder="Client Name *" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <input type="text" placeholder="Client Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <div className="flex gap-2">
                                    <input type="email" placeholder="Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                    <input type="tel" placeholder="Phone" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="flex-1 px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <h4 className="text-sm font-semibold text-yellow-400 mb-2">📄 Invoice Details</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="Invoice #" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <input type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className="px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm">
                                    <option value="Due on Receipt">Due on Receipt</option>
                                    <option value="Net 15">Net 15</option>
                                    <option value="Net 30">Net 30</option>
                                    <option value="Net 45">Net 45</option>
                                    <option value="Net 60">Net 60</option>
                                </select>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-semibold text-green-400">📦 Items/Services</h4>
                                <button onClick={addItem} className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30">+ Add Item</button>
                            </div>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {items.map((item, idx) => (
                                    <div key={item.id} className="flex gap-2 items-center">
                                        <div className="w-6 text-xs text-gray-500">{idx + 1}</div>
                                        <input type="text" placeholder="Description" value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} className="flex-2 px-2 py-1.5 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-xs" />
                                        <input type="number" step="1" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value)} className="w-16 px-2 py-1.5 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-xs" />
                                        <input type="number" step="100" placeholder="Rate" value={item.rate} onChange={(e) => updateItem(item.id, "rate", e.target.value)} className="w-24 px-2 py-1.5 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-xs" />
                                        {items.length > 1 && <button onClick={() => removeItem(item.id)} className="px-2 text-red-400">✕</button>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tax & Discount */}
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <h4 className="text-sm font-semibold text-orange-400 mb-2">💰 Tax & Discount</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-500">Tax Rate (%)</label>
                                    <input type="number" step="1" placeholder="18" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Discount Type</label>
                                    <select value={discountType} onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm">
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (₹)</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs text-gray-500">Discount Value</label>
                                    <input type="number" step="100" placeholder="0" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <h4 className="text-sm font-semibold text-purple-400 mb-2">📝 Notes</h4>
                            <textarea rows={2} placeholder="Payment instructions, thank you message, etc." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white text-sm resize-none"></textarea>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={generateInvoice} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Generate Invoice →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Invoice Preview"
                    isEmpty={!result}
                    emptyIcon="📄"
                    emptyText="Fill details and generate invoice"
                    mainResult={result ? { label: "Total Amount", value: `₹${parseFloat(result.total).toLocaleString()}`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Invoice #", value: result.invoiceNumber },
                        { label: "Client", value: result.clientName },
                        { label: "Subtotal", value: `₹${parseFloat(result.subtotal).toLocaleString()}` },
                        ...(parseFloat(result.discountAmount) > 0 ? [{ label: `Discount (${result.discountType === "percentage" ? `${result.discountValue}%` : `₹${result.discountValue}`})`, value: `-₹${parseFloat(result.discountAmount).toLocaleString()}`, valueColor: "text-green-400" }] : []),
                        { label: `Tax (${result.taxRate}%)`, value: `₹${parseFloat(result.taxAmount).toLocaleString()}` },
                        { label: "Due Date", value: result.dueDate, valueColor: "text-yellow-400" },
                    ] : []}
                />
            </div>

            {/* Printable Invoice */}
            {result && (
                <div className="mb-8">
                    <div className="flex justify-end mb-3 gap-3">
                        <button onClick={handlePrint} className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">🖨️ Print / Download PDF</button>
                    </div>

                    <div ref={printRef} className="bg-white text-black rounded-xl p-8 shadow-lg">
                        {/* Invoice Header */}
                        <div className="text-center border-b pb-4 mb-4">
                            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-6">
                            <div>
                                <h3 className="font-bold text-gray-700">From:</h3>
                                <p className="text-gray-600 text-sm">{result.businessName}</p>
                                <p className="text-gray-500 text-xs">{result.businessAddress}</p>
                                <p className="text-gray-500 text-xs">{result.businessEmail}</p>
                                <p className="text-gray-500 text-xs">{result.businessPhone}</p>
                                {result.gstNumber && <p className="text-gray-500 text-xs">GST: {result.gstNumber}</p>}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">To:</h3>
                                <p className="text-gray-600 text-sm">{result.clientName}</p>
                                <p className="text-gray-500 text-xs">{result.clientAddress}</p>
                                <p className="text-gray-500 text-xs">{result.clientEmail}</p>
                                <p className="text-gray-500 text-xs">{result.clientPhone}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                            <div><span className="font-bold">Invoice #:</span> {result.invoiceNumber}</div>
                            <div><span className="font-bold">Date:</span> {result.invoiceDate}</div>
                            <div><span className="font-bold">Due Date:</span> {result.dueDate}</div>
                        </div>

                        {/* Items Table */}
                        <table className="w-full mb-6">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-2 text-sm">Description</th>
                                    <th className="text-right p-2 text-sm">Quantity</th>
                                    <th className="text-right p-2 text-sm">Rate (₹)</th>
                                    <th className="text-right p-2 text-sm">Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.items.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td className="p-2 text-sm">{item.description}</td>
                                        <td className="text-right p-2 text-sm">{item.quantity}</td>
                                        <td className="text-right p-2 text-sm">₹{parseFloat(item.rate).toLocaleString()}</td>
                                        <td className="text-right p-2 text-sm">₹{parseFloat(item.amount).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-64">
                                <div className="flex justify-between py-1 text-sm"><span>Subtotal:</span><span>₹{parseFloat(result.subtotal).toLocaleString()}</span></div>
                                {parseFloat(result.discountAmount) > 0 && (
                                    <div className="flex justify-between py-1 text-sm text-green-600"><span>Discount:</span><span>-₹{parseFloat(result.discountAmount).toLocaleString()}</span></div>
                                )}
                                <div className="flex justify-between py-1 text-sm"><span>Tax ({result.taxRate}%):</span><span>₹{parseFloat(result.taxAmount).toLocaleString()}</span></div>
                                <div className="flex justify-between py-2 text-lg font-bold border-t mt-1"><span>Total:</span><span>₹{parseFloat(result.total).toLocaleString()}</span></div>
                            </div>
                        </div>

                        {/* Notes */}
                        {result.notes && (
                            <div className="mt-6 pt-4 border-t text-sm text-gray-600">
                                <p>{result.notes}</p>
                            </div>
                        )}

                        <div className="mt-6 text-center text-xs text-gray-400">
                            <p>Thank you for your business!</p>
                        </div>
                    </div>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Invoice Generator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Create professional invoices for your business. Add items, apply discounts and taxes, and print or download as PDF. Perfect for freelancers, small businesses, and service providers.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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