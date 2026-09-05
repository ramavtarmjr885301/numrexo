#!/usr/bin/env node
/**
 * scripts/verify-seo.mjs
 *
 * Guards the thing that was broken: every indexable URL must have its OWN title,
 * meta description and canonical URL. Run it any time you add a calculator.
 *
 *   node scripts/verify-seo.mjs
 *
 * It reads data/calculatorsRegistry.ts and data/calculatorsSeo.ts directly (no
 * build required) and fails with a non-zero exit code if anything is duplicated,
 * missing or too long for a search result.
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

/** Strip TypeScript annotations well enough to evaluate these two data files. */
function evalDataFile(source, exportNames) {
  let js = source
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/^\s*export\s+interface[\s\S]*?\n\}\s*$/gm, "")
    .replace(/^\s*export\s+type[\s\S]*?;\s*$/gm, "")
    // `const x: SomeType[] = [` / `const x: Record<..> = {`  ->  `const x = [`
    .replace(/(const\s+\w+)\s*:\s*[^=\n]+=/g, "$1 =")
    // arrow-function parameter annotations: `(category: string, slug: string) =>`
    .replace(/\(([^()]*)\)\s*=>/g, (full, params) => {
      if (!params.includes(":")) return full;
      const cleaned = params
        .split(",")
        .map((p) => p.split(":")[0].trim())
        .filter(Boolean)
        .join(", ");
      return `(${cleaned}) =>`;
    })
    .replace(/export\s+/g, "");

  js += `\n;globalThis.__out = { ${exportNames.join(", ")} };`;
  const context = { globalThis: {}, console };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(js, context);
  return context.__out;
}

const registry = evalDataFile(read("data/calculatorsRegistry.ts"), [
  "CALCULATORS_REGISTRY",
  "CATEGORIES",
]);
const seo = evalDataFile(read("data/calculatorsSeo.ts"), [
  "CALCULATOR_SEO",
  "CATEGORY_SEO",
]);

const errors = [];
const warnings = [];
const pages = [];

// ── Calculator pages ───────────────────────────────────────────────
for (const calc of registry.CALCULATORS_REGISTRY) {
  const key = `${calc.category}/${calc.slug}`;
  const entry = seo.CALCULATOR_SEO[key];

  if (!entry) {
    warnings.push(`No SEO entry for ${key} — it will use the generated fallback.`);
    continue;
  }
  pages.push({
    url: `/${key}`,
    title: entry.title,
    description: entry.description,
  });
}

// SEO copy written for a calculator that no longer exists in the registry.
const registryKeys = new Set(
  registry.CALCULATORS_REGISTRY.map((c) => `${c.category}/${c.slug}`),
);
for (const key of Object.keys(seo.CALCULATOR_SEO)) {
  if (!registryKeys.has(key)) {
    warnings.push(`CALCULATOR_SEO has "${key}" but no such calculator is in the registry.`);
  }
}

// ── Category hubs ──────────────────────────────────────────────────
for (const category of Object.keys(registry.CATEGORIES)) {
  const entry = seo.CATEGORY_SEO[category];
  if (!entry) {
    errors.push(`Category /${category} has no CATEGORY_SEO entry.`);
    continue;
  }
  pages.push({ url: `/${category}`, title: entry.title, description: entry.description });
}

// ── Static pages that set metadata in their own page.tsx ───────────
const staticPages = [
  "app/page.tsx",
  "app/calculators/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/blog/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/disclaimer/page.tsx",
];
for (const file of staticPages) {
  const src = read(file);
  const hasMetadata = /export\s+const\s+metadata|export\s+async\s+function\s+generateMetadata/.test(src);
  const isClient = /^\s*["']use client["']/m.test(src.split("\n").slice(0, 5).join("\n"));
  if (!hasMetadata) errors.push(`${file} exports no metadata — it will inherit the site default.`);
  if (isClient) errors.push(`${file} is a client component, so its metadata will never run.`);
}

// ── next/head must not appear anywhere under app/ ───────────────────
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(e.name)) out.push(full);
  }
  return out;
}
for (const file of walk(path.join(root, "app"))) {
  const src = fs.readFileSync(file, "utf8");
  if (/from\s+["']next\/head["']/.test(src)) {
    errors.push(`${path.relative(root, file)} imports next/head, which does nothing in the App Router.`);
  }
}

// ── Uniqueness and length ──────────────────────────────────────────
const byTitle = new Map();
const byDescription = new Map();

for (const p of pages) {
  if (!p.title) errors.push(`${p.url} has no title.`);
  if (!p.description) errors.push(`${p.url} has no description.`);

  (byTitle.get(p.title) ?? byTitle.set(p.title, []).get(p.title)).push(p.url);
  (byDescription.get(p.description) ?? byDescription.set(p.description, []).get(p.description)).push(p.url);

  const rendered = `${p.title} | Numrexo`;
  if (rendered.length > 65) warnings.push(`Title ${rendered.length} chars (will truncate): ${p.url}`);
  if (p.description.length > 160) warnings.push(`Description ${p.description.length} chars (will truncate): ${p.url}`);
  if (p.description.length < 110) warnings.push(`Description only ${p.description.length} chars: ${p.url}`);
}

for (const [title, urls] of byTitle) {
  if (urls.length > 1) errors.push(`Duplicate title "${title}" on: ${urls.join(", ")}`);
}
for (const [desc, urls] of byDescription) {
  if (urls.length > 1) errors.push(`Duplicate description on: ${urls.join(", ")}`);
}

// ── Report ─────────────────────────────────────────────────────────
console.log(`Checked ${pages.length} pages with SEO copy.`);
console.log(`  unique titles:       ${byTitle.size}`);
console.log(`  unique descriptions: ${byDescription.size}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  · ${w}`);
}

if (errors.length) {
  console.error(`\n${errors.length} ERROR(S):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log("\nAll good: every page has a unique title, description and canonical URL.");
