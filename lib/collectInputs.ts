// lib/collectInputs.ts  (browser only)
//
// Reads back what the visitor typed or picked in the calculator, so the PDF
// can list "Inputs used" next to the result - on EVERY calculator, without
// each of the ~120 calculators having to report its own fields.
//
// It walks the form controls inside <main>, works out a human label for each
// one (aria-label, <label for>, wrapping <label>, or the nearest short text
// above it) and returns label/value pairs. It is deliberately forgiving: a
// control it cannot label is skipped rather than guessed at.

import type { PayloadRow } from "./resultPayload";

const SKIP_TYPES = new Set(["hidden", "password", "email", "search", "submit", "button", "reset", "file", "image", "tel", "url"]);
const MAX_INPUTS = 40;

function clean(text: string | null | undefined, max = 90): string {
  return (text || "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Text of an element ignoring any form controls nested inside it. */
function ownText(el: Element): string {
  const clone = el.cloneNode(true) as Element;
  clone.querySelectorAll("input,select,textarea,button,svg,option").forEach((n) => n.remove());
  return clean(clone.textContent);
}

function looksLikeLabel(el: Element): boolean {
  if (el.querySelector("input,select,textarea")) return false;
  if (el.tagName === "BUTTON") return false;
  const t = ownText(el);
  return t.length >= 2 && t.length <= 60;
}

function labelFor(control: HTMLElement): string {
  const aria = control.getAttribute("aria-label");
  if (aria) return clean(aria);

  const labelledBy = control.getAttribute("aria-labelledby");
  if (labelledBy) {
    const t = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent || "")
      .join(" ");
    if (clean(t)) return clean(t);
  }

  if (control.id) {
    const forLabel = document.querySelector(`label[for="${CSS.escape(control.id)}"]`);
    if (forLabel && ownText(forLabel)) return ownText(forLabel);
  }

  const wrapping = control.closest("label");
  if (wrapping && ownText(wrapping)) return ownText(wrapping);

  // Nearest short text that sits before the control (or before one of its wrappers).
  let node: Element | null = control;
  for (let depth = 0; depth < 4 && node && node.parentElement; depth++) {
    let sib = node.previousElementSibling;
    let hops = 0;
    while (sib && hops < 3) {
      if (sib.tagName === "LABEL" || looksLikeLabel(sib)) {
        const t = ownText(sib);
        if (t) return t;
      }
      sib = sib.previousElementSibling;
      hops++;
    }
    node = node.parentElement;
    if (node.tagName === "MAIN" || node.tagName === "FORM") break;
  }

  return clean(control.getAttribute("placeholder") || "");
}

function excluded(el: Element): boolean {
  return Boolean(
    el.closest(
      "header, footer, nav, aside, [role='dialog'], [data-no-collect], form[aria-label*='ubscribe'], .sr-only",
    ),
  );
}

export function collectInputs(root: ParentNode = document.querySelector("main") || document): PayloadRow[] {
  const out: PayloadRow[] = [];
  const seen = new Set<string>();
  const controls = Array.from(root.querySelectorAll<HTMLElement>("input, select, textarea"));

  for (const control of controls) {
    if (out.length >= MAX_INPUTS) break;
    if (excluded(control)) continue;
    if ((control as HTMLInputElement).disabled) continue;

    let value = "";
    let label = "";

    if (control instanceof HTMLSelectElement) {
      value = clean(control.selectedOptions[0]?.textContent);
      label = labelFor(control);
    } else if (control instanceof HTMLTextAreaElement) {
      value = clean(control.value, 120);
      label = labelFor(control);
    } else if (control instanceof HTMLInputElement) {
      const type = (control.type || "text").toLowerCase();
      if (SKIP_TYPES.has(type)) continue;
      if (type === "checkbox") {
        if (!control.checked) continue;
        value = "Yes";
        label = labelFor(control);
      } else if (type === "radio") {
        if (!control.checked) continue;
        const own = control.closest("label");
        value = own ? ownText(own) : clean(control.value);
        // Group heading: the legend, or the short text above the group.
        const group = control.closest("fieldset");
        label = clean(group?.querySelector("legend")?.textContent) || labelFor(control.parentElement || control);
        if (label === value) label = "Option";
      } else {
        value = clean(control.value, 120);
        label = labelFor(control);
      }
    }

    if (!value || !label) continue;
    // Sliders usually twin a number box that already carries the same value.
    const key = `${label.toLowerCase()}|${value.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ label, value });
  }
  return out;
}
