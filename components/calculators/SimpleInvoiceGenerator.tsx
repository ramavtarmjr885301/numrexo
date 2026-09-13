"use client";

// components/calculators/SimpleInvoiceGenerator.tsx
//
// WHY THIS EXISTS, NEXT TO THE GST ONE
//
// Numrexo already has a full India GST invoice generator — GSTIN, PAN, HSN/SAC,
// place of supply, CGST/SGST/IGST. It is thorough, and it is the wrong page for
// somebody who typed "invoice generator" and wants to bill a client for two days
// of design work. That visitor met 26 labelled fields, two of them marked
// required, before anything appeared on screen.
//
// So the two pages split by the job, not by quality:
//   /business/invoice-generator      → this one, for everyone
//   /business/gst-invoice-generator  → the GST one, for Indian businesses
//
// THE DESIGN RULE HERE: the form is the document.
//
// There is no separate preview panel. The inputs sit on the invoice itself,
// transparent until you focus them, so what you look at while typing is what
// comes out of the printer. Nothing is required to begin. Tax, shipping,
// discount and notes all start switched off — you turn on what your invoice
// actually needs rather than stepping past what it does not.

import { useEffect, useMemo, useState } from "react";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "Do I need to sign up to use this?",
        a: "No. There is no account, no email box and no watermark. The invoice is built in your browser as you type, and the download button prints exactly what is on screen. Nothing you enter is sent to us or stored anywhere.",
    },
    {
        q: "What has to be on an invoice for it to count?",
        a: "At a minimum: the word Invoice, a unique invoice number, the date, your business name and contact details, your client's name and address, a description of what you supplied, the amount, and how you want to be paid. Everything else — purchase order numbers, payment terms, bank details — is there because a particular client or a particular tax authority asks for it.",
    },
    {
        q: "How should I number my invoices?",
        a: "Sequentially, with no gaps. INV-001, INV-002, and so on, or year-prefixed like 2026-001 if you want the year visible. The rule that matters is that numbers never repeat and never skip — a gap in the sequence is the first thing an auditor asks about. Many people restart the sequence each year, which is fine as long as the year is part of the number.",
    },
    {
        q: "What payment terms should I use?",
        a: "Net 30 means payment is due 30 days after the invoice date, and it is the common default for business clients. Net 15 and Net 7 are increasingly used by freelancers, and 'Due on receipt' is normal for small one-off jobs. Whatever you choose, put the actual due date on the invoice as well as the term — a date is harder to argue with than a phrase.",
    },
    {
        q: "How do I add tax?",
        a: "Switch Tax on and enter your rate as a percentage, or a flat amount if the tax is a fixed charge rather than a rate. It is applied after any discount, which is the usual order. This page deliberately does not decide your rate for you — sales tax, VAT and GST differ by country and often by state or province, and getting that wrong is your problem, not a rounding error.",
    },
    {
        q: "I need GSTIN, HSN codes and a CGST/SGST split. Where is that?",
        a: "On the GST invoice generator, linked below. That page handles Indian GST properly: seller and buyer GSTIN, PAN, HSN and SAC codes, place of supply, automatic CGST+SGST for intra-state and IGST for inter-state, reverse charge, and the amount in words. This page is deliberately the simple one.",
    },
    {
        q: "Should I invoice in my currency or my client's?",
        a: "Usually yours, unless you have agreed otherwise — it keeps your books in one currency and puts the exchange risk on the side that chose to buy abroad. If you do invoice in the client's currency, state the rate and date you used. The currency selector here changes both the symbol and the number formatting, so an invoice in rupees groups as 1,00,000 and one in dollars as 100,000.",
    },
    {
        q: "How do I get a PDF?",
        a: "Press Download Invoice. Your browser's print dialog opens; choose 'Save as PDF' as the destination instead of a printer. That works on every desktop browser and on phones, and it gives you a proper vector PDF rather than a picture of the page.",
    },
    {
        q: "Can I put my logo on it?",
        a: "Not on this page yet. If you need a logo, the honest route is to download the PDF and drop the logo in before you send it, or use the notes area for anything a logo would otherwise say. We would rather not have a half-working image upload than not have one at all.",
    },
    {
        q: "What do I do when an invoice is not paid?",
        a: "Send a polite reminder a few days after the due date, quoting the invoice number and the date it was sent — most late payments are administrative rather than deliberate. If that goes nowhere, a second reminder with a specific deadline usually does. Keep everything in writing and keep it calm; you may need the trail later, and an angry email rarely gets paid faster than a clear one.",
    },
];

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
    name: "Free Invoice Generator",
    description:
        "Create and download a professional invoice as a PDF. No sign-up, no watermark, any currency.",
    url: "https://numrexo.com/business/invoice-generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItem {
    id: number;
    description: string;
    quantity: string;
    rate: string;
}

type Toggle = "off" | "percent" | "flat";

/** Six rows, already on screen. Nobody should have to press "add" to start. */
const STARTING_ROWS: LineItem[] = [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    description: "",
    quantity: "",
    rate: "",
}));

function todayISO(): string {
    return new Date().toISOString().slice(0, 10);
}

function plusDaysISO(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SimpleInvoiceGenerator() {
    const { symbol, money } = useCurrency();

    const [fromName, setFromName] = useState("");
    const [fromDetails, setFromDetails] = useState("");
    const [toName, setToName] = useState("");
    const [toDetails, setToDetails] = useState("");

    const [invoiceNo, setInvoiceNo] = useState("INV-001");
    const [issueDate, setIssueDate] = useState(todayISO);
    const [dueDate, setDueDate] = useState(() => plusDaysISO(30));
    const [terms, setTerms] = useState("Net 30");

    const [items, setItems] = useState<LineItem[]>(STARTING_ROWS);

    // Everything optional starts off. You switch on what this invoice needs.
    const [taxMode, setTaxMode] = useState<Toggle>("off");
    const [taxValue, setTaxValue] = useState("");
    const [discountMode, setDiscountMode] = useState<Toggle>("off");
    const [discountValue, setDiscountValue] = useState("");
    const [shippingOn, setShippingOn] = useState(false);
    const [shippingValue, setShippingValue] = useState("");
    const [notesOn, setNotesOn] = useState(false);
    const [notes, setNotes] = useState("");

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Keep the due date honest when the terms change. Editing the date directly
    // still wins — the effect only runs when the term itself changes.
    useEffect(() => {
        const days = terms === "Due on receipt" ? 0 : parseInt(terms.replace(/\D/g, ""), 10);
        if (Number.isFinite(days)) setDueDate(plusDaysISO(days));
    }, [terms]);

    const totals = useMemo(() => {
        const lines = items.map((item) => {
            const qty = parseFloat(item.quantity) || 0;
            const rate = parseFloat(item.rate) || 0;
            return { ...item, amount: qty * rate };
        });

        const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);

        const discount =
            discountMode === "off"
                ? 0
                : discountMode === "percent"
                  ? (subtotal * (parseFloat(discountValue) || 0)) / 100
                  : parseFloat(discountValue) || 0;

        const afterDiscount = Math.max(0, subtotal - discount);

        // Tax applies after the discount, which is the ordinary order.
        const tax =
            taxMode === "off"
                ? 0
                : taxMode === "percent"
                  ? (afterDiscount * (parseFloat(taxValue) || 0)) / 100
                  : parseFloat(taxValue) || 0;

        const shipping = shippingOn ? parseFloat(shippingValue) || 0 : 0;
        const total = afterDiscount + tax + shipping;

        return { lines, subtotal, discount, tax, shipping, total };
    }, [items, taxMode, taxValue, discountMode, discountValue, shippingOn, shippingValue]);

    const updateItem = (id: number, field: keyof LineItem, value: string) => {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    };

    const addRow = () => {
        setItems((prev) => [
            ...prev,
            { id: Math.max(0, ...prev.map((i) => i.id)) + 1, description: "", quantity: "", rate: "" },
        ]);
    };

    const removeRow = (id: number) => {
        setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
    };

    const download = () => {
        const rows = totals.lines
            .filter((l) => l.description.trim() || l.amount > 0)
            .map(
                (l, i) => `<tr>
        <td style="padding:9px 4px;border-bottom:1px solid #e5e7eb;color:#6b7280;">${i + 1}</td>
        <td style="padding:9px 8px;border-bottom:1px solid #e5e7eb;">${escapeHtml(l.description)}</td>
        <td style="padding:9px 8px;border-bottom:1px solid #e5e7eb;text-align:right;">${escapeHtml(l.quantity)}</td>
        <td style="padding:9px 8px;border-bottom:1px solid #e5e7eb;text-align:right;">${money(parseFloat(l.rate) || 0, 2)}</td>
        <td style="padding:9px 4px;border-bottom:1px solid #e5e7eb;text-align:right;">${money(l.amount, 2)}</td>
      </tr>`,
            )
            .join("");

        const extra = (label: string, value: string) =>
            `<tr><td style="padding:4px 8px;text-align:right;color:#6b7280;">${label}</td>
       <td style="padding:4px 0;text-align:right;width:130px;">${value}</td></tr>`;

        const html = `<!DOCTYPE html><html><head><meta charset="utf-8" />
<title>${escapeHtml(invoiceNo || "Invoice")}</title>
<style>
  @page { margin: 18mm; }
  body { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color:#111827; font-size:13px; line-height:1.55; }
  h1 { font-size:30px; letter-spacing:0.08em; margin:0; color:#111827; }
  table { width:100%; border-collapse:collapse; }
  .muted { color:#6b7280; }
  .head { display:flex; justify-content:space-between; gap:24px; margin-bottom:28px; }
  .parties { display:flex; justify-content:space-between; gap:24px; margin-bottom:24px; }
  .label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:#9ca3af; margin-bottom:4px; }
  th { text-align:left; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#6b7280; border-bottom:2px solid #111827; padding:0 8px 7px; font-weight:600; }
  .total td { border-top:2px solid #111827; padding-top:9px; font-weight:700; font-size:15px; }
  .notes { margin-top:28px; padding-top:14px; border-top:1px solid #e5e7eb; white-space:pre-wrap; }
</style></head><body>
  <div class="head">
    <div>
      <div style="font-size:16px;font-weight:700;">${escapeHtml(fromName) || "&nbsp;"}</div>
      <div class="muted" style="white-space:pre-wrap;">${escapeHtml(fromDetails)}</div>
    </div>
    <div style="text-align:right;">
      <h1>INVOICE</h1>
      <div class="muted" style="margin-top:6px;">${escapeHtml(invoiceNo)}</div>
    </div>
  </div>

  <div class="parties">
    <div>
      <div class="label">Bill to</div>
      <div style="font-weight:600;">${escapeHtml(toName) || "&nbsp;"}</div>
      <div class="muted" style="white-space:pre-wrap;">${escapeHtml(toDetails)}</div>
    </div>
    <div style="text-align:right;">
      <div class="label">Invoice date</div>
      <div>${prettyDate(issueDate)}</div>
      <div class="label" style="margin-top:10px;">Due date</div>
      <div>${prettyDate(dueDate)}</div>
      ${terms ? `<div class="label" style="margin-top:10px;">Terms</div><div>${escapeHtml(terms)}</div>` : ""}
    </div>
  </div>

  <table>
    <thead><tr><th style="width:26px;">#</th><th>Description</th><th style="text-align:right;">Qty</th><th style="text-align:right;">Rate</th><th style="text-align:right;width:110px;">Amount</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5" style="padding:16px 8px;color:#9ca3af;">No line items</td></tr>'}</tbody>
  </table>

  <table style="margin-top:18px;">
    <tbody>
      ${extra("Subtotal", money(totals.subtotal, 2))}
      ${totals.discount ? extra("Discount", "− " + money(totals.discount, 2)) : ""}
      ${totals.tax ? extra("Tax", money(totals.tax, 2)) : ""}
      ${totals.shipping ? extra("Shipping", money(totals.shipping, 2)) : ""}
      <tr class="total"><td style="text-align:right;">Total due</td><td style="text-align:right;">${money(totals.total, 2)}</td></tr>
    </tbody>
  </table>

  ${notesOn && notes.trim() ? `<div class="notes"><div class="label">Notes</div>${escapeHtml(notes)}</div>` : ""}

  <script>window.onload=()=>{window.print();}<\/script>
</body></html>`;

        const w = window.open("", "_blank");
        if (!w) return;
        w.document.write(html);
        w.document.close();
    };

    // ─── Shared styles ────────────────────────────────────────────────────────
    // Inputs sitting on the invoice are invisible until you touch them. That is
    // the whole trick: you are looking at the document, not at a form.
    const paperInput =
        "w-full bg-transparent border border-transparent rounded px-1.5 py-1 text-gray-900 placeholder-gray-400 hover:border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-colors";
    const controlCls =
        "bg-[#0f1525] border border-gray-700 text-gray-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-500 transition-colors";

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://numrexo.com/business" className="hover:text-gray-300">Business Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Invoice Generator</span></li>
                </ol>
            </nav>

            {/* ─── Control bar ─────────────────────────────────────────────── */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 mb-4">
                <div className="flex flex-wrap items-end gap-4">
                    <div className="min-w-[190px] flex-1">
                        <CurrencySwitcher />
                    </div>

                    <div>
                        <label htmlFor="inv-tax-mode" className="block text-[11px] font-semibold text-gray-500 mb-1.5">Tax</label>
                        <div className="flex gap-2">
                            <select id="inv-tax-mode" value={taxMode} onChange={(e) => setTaxMode(e.target.value as Toggle)} className={controlCls}>
                                <option value="off">Off</option>
                                <option value="percent">Percent (%)</option>
                                <option value="flat">Flat ({symbol})</option>
                            </select>
                            {taxMode !== "off" && (
                                <input id="inv-tax-value" type="number" step="any" placeholder={taxMode === "percent" ? "10" : "50"} value={taxValue} onChange={(e) => setTaxValue(e.target.value)} className={`${controlCls} w-20`} aria-label="Tax value" />
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="inv-disc-mode" className="block text-[11px] font-semibold text-gray-500 mb-1.5">Discount</label>
                        <div className="flex gap-2">
                            <select id="inv-disc-mode" value={discountMode} onChange={(e) => setDiscountMode(e.target.value as Toggle)} className={controlCls}>
                                <option value="off">Off</option>
                                <option value="percent">Percent (%)</option>
                                <option value="flat">Flat ({symbol})</option>
                            </select>
                            {discountMode !== "off" && (
                                <input id="inv-disc-value" type="number" step="any" placeholder={discountMode === "percent" ? "5" : "25"} value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className={`${controlCls} w-20`} aria-label="Discount value" />
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="inv-ship" className="block text-[11px] font-semibold text-gray-500 mb-1.5">Shipping</label>
                        <div className="flex gap-2">
                            <select id="inv-ship" value={shippingOn ? "on" : "off"} onChange={(e) => setShippingOn(e.target.value === "on")} className={controlCls}>
                                <option value="off">Off</option>
                                <option value="on">Flat ({symbol})</option>
                            </select>
                            {shippingOn && (
                                <input id="inv-ship-value" type="number" step="any" placeholder="15" value={shippingValue} onChange={(e) => setShippingValue(e.target.value)} className={`${controlCls} w-20`} aria-label="Shipping amount" />
                            )}
                        </div>
                    </div>

                    <button
                        onClick={download}
                        className="ml-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white text-sm font-semibold hover:shadow-lg transition-all"
                    >
                        Download Invoice
                    </button>
                </div>
            </div>

            {/* ─── The invoice itself ──────────────────────────────────────── */}
            <div className="bg-white rounded-xl p-5 md:p-9 mb-4 shadow-lg overflow-x-auto">
                <div className="min-w-[560px]">

                    <div className="flex flex-wrap justify-between gap-6 mb-8">
                        <div className="flex-1 min-w-[220px]">
                            <input id="inv-from-name" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Your business name" className={`${paperInput} text-lg font-bold`} />
                            <textarea id="inv-from-details" value={fromDetails} onChange={(e) => setFromDetails(e.target.value)} rows={3} placeholder={"Street address\nCity, postcode\nemail@yourbusiness.com"} className={`${paperInput} text-sm text-gray-600 resize-none mt-1`} />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold tracking-widest text-gray-900">INVOICE</p>
                            <input id="inv-number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="INV-001" className={`${paperInput} text-sm text-gray-600 text-right mt-1`} />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between gap-6 mb-7">
                        <div className="flex-1 min-w-[220px]">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Bill to</p>
                            <input id="inv-to-name" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="Client name" className={`${paperInput} font-semibold`} />
                            <textarea id="inv-to-details" value={toDetails} onChange={(e) => setToDetails(e.target.value)} rows={3} placeholder={"Street address\nCity, postcode\nclient@example.com"} className={`${paperInput} text-sm text-gray-600 resize-none mt-1`} />
                        </div>
                        <div className="w-[210px] space-y-2.5">
                            <div>
                                <label htmlFor="inv-date" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Invoice date</label>
                                <input id="inv-date" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className={`${paperInput} text-sm`} />
                            </div>
                            <div>
                                <label htmlFor="inv-terms" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Payment terms</label>
                                <select id="inv-terms" value={terms} onChange={(e) => setTerms(e.target.value)} className={`${paperInput} text-sm cursor-pointer`}>
                                    <option>Due on receipt</option>
                                    <option>Net 7</option>
                                    <option>Net 15</option>
                                    <option>Net 30</option>
                                    <option>Net 45</option>
                                    <option>Net 60</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="inv-due" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Due date</label>
                                <input id="inv-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={`${paperInput} text-sm`} />
                            </div>
                        </div>
                    </div>

                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-900">
                                <th scope="col" className="w-7 text-left text-[10px] uppercase tracking-widest text-gray-500 pb-2">#</th>
                                <th scope="col" className="text-left text-[10px] uppercase tracking-widest text-gray-500 pb-2 px-2">Description</th>
                                <th scope="col" className="w-20 text-right text-[10px] uppercase tracking-widest text-gray-500 pb-2 px-2">Qty</th>
                                <th scope="col" className="w-28 text-right text-[10px] uppercase tracking-widest text-gray-500 pb-2 px-2">Rate</th>
                                <th scope="col" className="w-28 text-right text-[10px] uppercase tracking-widest text-gray-500 pb-2">Amount</th>
                                <th scope="col" className="w-7"><span className="sr-only">Remove</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {totals.lines.map((line, index) => (
                                <tr key={line.id} className="border-b border-gray-100 group">
                                    <td className="text-gray-400 text-sm tabular-nums">{index + 1}</td>
                                    <td className="px-1">
                                        <input id={`inv-desc-${line.id}`} value={line.description} onChange={(e) => updateItem(line.id, "description", e.target.value)} placeholder="What are you billing for?" className={`${paperInput} text-sm`} />
                                    </td>
                                    <td className="px-1">
                                        <input id={`inv-qty-${line.id}`} type="number" step="any" value={line.quantity} onChange={(e) => updateItem(line.id, "quantity", e.target.value)} placeholder="1" className={`${paperInput} text-sm text-right tabular-nums`} aria-label={`Quantity, line ${index + 1}`} />
                                    </td>
                                    <td className="px-1">
                                        <input id={`inv-rate-${line.id}`} type="number" step="any" value={line.rate} onChange={(e) => updateItem(line.id, "rate", e.target.value)} placeholder="0.00" className={`${paperInput} text-sm text-right tabular-nums`} aria-label={`Rate, line ${index + 1}`} />
                                    </td>
                                    <td className="text-right text-sm text-gray-900 tabular-nums pr-1.5">
                                        {line.amount > 0 ? money(line.amount, 2) : <span className="text-gray-300">{symbol}0.00</span>}
                                    </td>
                                    <td>
                                        <button onClick={() => removeRow(line.id)} aria-label={`Remove line ${index + 1}`} className="w-6 h-6 rounded text-gray-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all text-lg leading-none">×</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-wrap justify-between gap-8 mt-4">
                        <button onClick={addRow} className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors self-start">
                            + Add line
                        </button>

                        <div className="w-[260px] text-sm">
                            <div className="flex justify-between py-1.5 text-gray-600">
                                <span>Subtotal</span><span className="tabular-nums text-gray-900">{money(totals.subtotal, 2)}</span>
                            </div>
                            {totals.discount > 0 && (
                                <div className="flex justify-between py-1.5 text-gray-600">
                                    <span>Discount</span><span className="tabular-nums text-gray-900">− {money(totals.discount, 2)}</span>
                                </div>
                            )}
                            {totals.tax > 0 && (
                                <div className="flex justify-between py-1.5 text-gray-600">
                                    <span>Tax</span><span className="tabular-nums text-gray-900">{money(totals.tax, 2)}</span>
                                </div>
                            )}
                            {totals.shipping > 0 && (
                                <div className="flex justify-between py-1.5 text-gray-600">
                                    <span>Shipping</span><span className="tabular-nums text-gray-900">{money(totals.shipping, 2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2.5 mt-1.5 border-t-2 border-gray-900 font-bold text-base text-gray-900">
                                <span>Total due</span><span className="tabular-nums">{money(totals.total, 2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 pt-4 border-t border-gray-100">
                        {notesOn ? (
                            <>
                                <label htmlFor="inv-notes" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Notes</label>
                                <textarea id="inv-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder={"Bank details, payment link, or a thank you."} className={`${paperInput} text-sm text-gray-600 resize-none`} />
                            </>
                        ) : (
                            <button onClick={() => setNotesOn(true)} className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                + Add notes or payment details
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-500 mb-8">
                Nothing you type here leaves your browser. Press <span className="text-gray-300">Download Invoice</span> and
                choose <span className="text-gray-300">Save as PDF</span> in the print dialog.
                Need GSTIN, HSN codes and a CGST/SGST split?{" "}
                <a href="/business/gst-invoice-generator" className="text-teal-400 hover:underline">Use the GST invoice generator</a>.
            </p>

            {/* ─── Written content ─────────────────────────────────────────── */}

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Invoice Generator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Fill in the invoice above and press download. There is no account to create, no email to hand over
                    and no watermark on the result. What you see on screen is exactly what prints.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Tax, discount, shipping and notes all start switched off, because most invoices do not need them.
                    Turn on the ones yours does. The currency selector changes the symbol and the number formatting
                    together, so an invoice in rupees groups as 1,00,000 and the same figure in dollars as 100,000.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">How to Make an Invoice</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">1. Say who it is from and who it is for</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Your business name and contact details at the top, the client&apos;s billing name and address under &quot;Bill to&quot;. Use the client&apos;s registered name rather than a trading name if you are invoicing a company — that is the name on the account that will pay you.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">2. Number and date it</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">A unique invoice number in an unbroken sequence, the date you issued it, and the date payment is due. Choosing a payment term above sets the due date for you; you can still type over it.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">3. List what you supplied</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">One line per item or task, with quantity and rate. Be specific — &quot;Homepage design, 2 rounds of revisions&quot; gets paid faster than &quot;Design work&quot;, because it survives being forwarded to somebody who was not in the meeting.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">4. Check the total and download</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">The total updates as you type. Press Download Invoice, then pick &quot;Save as PDF&quot; as the destination in the print dialog instead of a printer.</p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">What Belongs on an Invoice</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        Requirements differ by country, but almost every tax authority asks for the same core set:
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside mb-3">
                        <li>The word <span className="text-gray-200">Invoice</span>, so it is not mistaken for a quote</li>
                        <li>A unique invoice number, in sequence</li>
                        <li>The date it was issued, and the date payment is due</li>
                        <li>Your business name, address and contact details</li>
                        <li>The client&apos;s name and address</li>
                        <li>A clear description of what was supplied, with quantities and rates</li>
                        <li>The amount due, and any tax shown separately</li>
                        <li>How to pay — bank details, a payment link, or the terms you agreed</li>
                    </ul>
                    <p className="text-gray-500 text-xs">
                        Registered businesses usually have to add a tax registration number, and in some countries a
                        company registration number as well. If you are registered for GST in India, the requirements go
                        further — GSTIN for both parties, HSN or SAC codes, and the tax split by type.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Payment Terms, and What They Mean</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th scope="col" className="text-left py-3 px-4 text-gray-400">Term</th>
                                    <th scope="col" className="text-left py-3 px-4 text-gray-400">Payment is due</th>
                                    <th scope="col" className="text-left py-3 px-4 text-gray-400">Typically used by</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Due on receipt</td><td className="py-2 px-4 text-gray-400">Immediately</td><td className="py-2 px-4 text-gray-400">Small one-off jobs, new clients</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Net 7</td><td className="py-2 px-4 text-gray-400">7 days after the invoice date</td><td className="py-2 px-4 text-gray-400">Freelancers, short projects</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Net 15</td><td className="py-2 px-4 text-gray-400">15 days</td><td className="py-2 px-4 text-gray-400">Retainers, regular clients</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Net 30</td><td className="py-2 px-4 text-gray-400">30 days</td><td className="py-2 px-4 text-gray-400">The default for business clients</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Net 60</td><td className="py-2 px-4 text-gray-400">60 days</td><td className="py-2 px-4 text-gray-400">Large companies, public sector</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    Longer terms are normal with big organisations and are rarely negotiable, so price for the wait
                    rather than expecting to shorten it. Whatever term you pick, put the actual due date on the invoice —
                    a date is harder to misread than a phrase.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

/** Keep anything a user typed from becoming markup in the printed window. */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
