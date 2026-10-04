// components/common/AuthorBox.tsx
//
// WHY THIS EXISTS
//
// 112 of 117 calculator pages carried no author, no date and no source. For a site
// whose pages are mostly YMYL (money, health, tax), that is the single biggest
// trust gap Google looks at — its guidelines call it E-E-A-T. It is also what makes
// a site read as run by a person rather than generated in bulk.
//
// One component, rendered under every calculator, fixes both at once.
//
// The "Last updated" date and the sources come from data/calculatorsSeo.ts, so
// updating a page's date is a one-line edit next to its title and description.

import { CALCULATOR_SEO, SITE_DEFAULT_UPDATED_AT } from "@/data/calculatorsSeo";
import type { CalculatorType } from "@/data/calculatorsRegistry";

/** The person behind the site. Keep this honest — it is the point of the component. */
export const AUTHOR = {
  name: "Sanjay Singh",
  role: "Founder, Numrexo",
  bio: "Builds and maintains the calculators on Numrexo. Each tool's formula is documented on its page, and any reference source it relies on is listed under Method and references.",
  profile: "https://www.linkedin.com/in/sanjaysingh0079",
  initials: "SS",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function AuthorBox({ calculator }: { calculator: CalculatorType }) {
  const seo = CALCULATOR_SEO[`${calculator.category}/${calculator.slug}`];
  const updated = seo?.updatedAt ?? SITE_DEFAULT_UPDATED_AT;
  const sources = seo?.sources ?? [];

  return (
    <section
      className="bg-surface border border-hairline rounded-xl p-5 md:p-6 mb-8"
      aria-label="About this calculator"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div
          className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0"
          aria-hidden="true"
        >
          {AUTHOR.initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm text-ink-soft">
            Built and maintained by{" "}
            <a
              href={AUTHOR.profile}
              target="_blank"
              rel="noopener noreferrer me"
              className="text-ink font-semibold hover:text-blue-600 transition-colors"
            >
              {AUTHOR.name}
            </a>
            <span className="text-ink-faint"> · {AUTHOR.role}</span>
          </p>

          <p className="text-xs text-ink-faint mt-1 leading-relaxed">{AUTHOR.bio}</p>

          <p className="text-xs text-ink-faint mt-3">
            <span className="text-ink-soft">Last updated:</span>{" "}
            <time dateTime={updated}>{formatDate(updated)}</time>
            <span className="text-ink-faint"> · </span>
            <span>Calculations run in your browser. Nothing you enter is sent to us or stored.</span>
          </p>

          {sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-hairline">
              <p className="text-xs text-ink-soft font-medium mb-1.5">
                Method and references
              </p>
              <ul className="text-xs text-ink-faint space-y-1">
                {sources.map((s) => (
                  <li key={s.label}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors underline underline-offset-2 decoration-gray-300"
                      >
                        {s.label}
                      </a>
                    ) : (
                      s.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
