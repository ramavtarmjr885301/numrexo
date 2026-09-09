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
  bio: "Builds and maintains every calculator on Numrexo. Fifteen years working with numbers in real estate and digital marketing.",
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
      className="bg-[#111827] border border-gray-800 rounded-xl p-5 md:p-6 mb-8"
      aria-label="About this calculator"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div
          className="w-11 h-11 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-300 font-semibold text-sm flex-shrink-0"
          aria-hidden="true"
        >
          {AUTHOR.initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-400">
            Built and maintained by{" "}
            <a
              href={AUTHOR.profile}
              target="_blank"
              rel="noopener noreferrer me"
              className="text-white font-semibold hover:text-blue-400 transition-colors"
            >
              {AUTHOR.name}
            </a>
            <span className="text-gray-500"> · {AUTHOR.role}</span>
          </p>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{AUTHOR.bio}</p>

          <p className="text-xs text-gray-500 mt-3">
            <span className="text-gray-400">Last updated:</span>{" "}
            <time dateTime={updated}>{formatDate(updated)}</time>
            <span className="text-gray-600"> · </span>
            <span>Calculations run in your browser. Nothing you enter is sent to us or stored.</span>
          </p>

          {sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-400 font-medium mb-1.5">
                Method and references
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                {sources.map((s) => (
                  <li key={s.label}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors underline underline-offset-2 decoration-gray-700"
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
